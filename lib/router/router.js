Router.map(function () {
    this.route('homepage', {path: '/'});
    this.route('scenarios');
    this.route('objectives');
    this.route('alternatives');
    this.route('inviteActors');
    this.route('adminScenario', {
        waitOn: function () {
            return [
                IRLibLoader.load('http://www.numericjs.com/lib/numeric-1.2.6.min.js'),
                Meteor.subscribe('objectiveList', Session.get('active_scenario')),
                Meteor.subscribe('alternativeList', Session.get('active_scenario')),
                Meteor.subscribe('connectivityMatrix', Session.get('active_scenario')),
                Meteor.subscribe('probabilityMatrix', Session.get('active_scenario'))
            ];
        },
        onBeforeAction: function () {
            var activeScenario = Scenarios.findOne({_id: Session.get('active_scenario')});
            if (Meteor.userId() === activeScenario.author) {
                this.next();
            } else {
                Router.go('scenarios');
            }
        }
    });
    this.route('connectivity', {
        waitOn: function () {
            return Meteor.subscribe('connectivityMatrix', Session.get('active_scenario'));
        },
        onBeforeAction: function () {
            var activeScenario = Scenarios.findOne({_id: Session.get('active_scenario')});
            if (activeScenario.state === 'Started') {
                this.next();
            } else {
                Router.go('scenarios');
            }
        }
    });
    this.route('probability', {
        waitOn: function () {
            return [
                Meteor.subscribe('connectivityMatrix', Session.get('active_scenario')),
                Meteor.subscribe('probabilityMatrix', Session.get('active_scenario'))
            ];
        },
        onBeforeAction: function () {
            var activeScenario = Scenarios.findOne({_id: Session.get('active_scenario')});
            if (activeScenario.state === 'Started') {
                this.next();
            } else {
                Router.go('scenarios');
            }
        }
    });
    this.route('results', {
        waitOn: function () {
            return [
                Meteor.subscribe('connectivityMatrix', Session.get('active_scenario')),
                Meteor.subscribe('probabilityMatrix', Session.get('active_scenario'))
            ]
        }
    });
});

var IR_BeforeHooks = {
    isLoggedIn: function () {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            Router.go('homepage');
        } else {
            this.next();
        }
    },
    isThereActiveScenario: function () {
        if (Session.get('active_scenario') === undefined || Session.get('active_scenario') === null) {
            Router.go('scenarios');
        } else {
            this.next();
        }
    }
};

Router.onBeforeAction(IR_BeforeHooks.isLoggedIn, {except: ['homepage']});
Router.onBeforeAction(IR_BeforeHooks.isThereActiveScenario, {except: ['homepage', 'scenarios']});

if (Meteor.isClient) {
    Tracker.autorun(function () {
        var template = window.location.pathname;
        if (Meteor.user() && template == '/') {
            Router.go("scenarios");
        }
    });
}