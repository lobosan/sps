/*if (Meteor.isServer) {
    Meteor.users.allow({remove: function() { return true }});

    Meteor.startup(function () {
        /!*** DELETE REGISTERS ***!/
        var globalObject = Meteor.isClient ? window : global;
        for (var property in globalObject) {
            var object = globalObject[property];
            if (object instanceof Meteor.Collection) {
                object.remove({});
            }
        }
    });
}*/

if (Meteor.isClient) {
    Template.registerHelper('activeScenario', function () {
        return Scenarios.findOne({_id: Session.get('active_scenario')});
    });

    Template.registerHelper('isAdmin', function () {
        if (Scenarios.find({ author: Meteor.userId(), _id: Session.get('active_scenario')}).count() === 1)
            return true;
        else
            return false;
    });

    Template.registerHelper('isActiveScenario', function () {
        if (! (Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
            return true;
        } else {
            return false;
        }
    });

    UI.registerHelper('selected', function(val1, val2, text) {
        return val1 === val2 ? text : '';
    });

    UI.registerHelper('equal', function(val1, val2) {
        return val1 === val2 ? true : false;
    });

    UI.registerHelper('notEqual', function(val1, val2) {
        return val1 !== val2 ? true : false;
    });

    UI.registerHelper('activeScenarioTitle', function(row_id) {
        return Session.get('active_scenario') === row_id ? 'Active Scenario' : '';
    });

    UI.registerHelper('activeScenarioHighlight', function(row_id) {
        return Session.get('active_scenario') === row_id ? 'active-scenario fa fa-toggle-on' : '';
    });

    UI.registerHelper('formatTime', function (context, options) {
        if (context)
            return moment(context).format('DD/MM/YYYY');
    });
}