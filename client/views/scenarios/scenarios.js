Meteor.subscribe('scenarioList');

var isUserJoined = function (rowId) {
    var scenarioRow = Scenarios.findOne({_id: rowId});
    var guests_ids = [];
    _.each(scenarioRow.guests, function (guest) {
        guests_ids.push(guest.userid);
    });

    if (Meteor.userId() === scenarioRow.author) {
        return true;
    } else if (_.contains(guests_ids, Meteor.userId())) {
        return true;
    } else {
        return false;
    }
};

Template.scenarios.helpers({
    scenarioListPublic: function () {
        return Scenarios.find({scope: 'Public'}, {sort: {creation_date: -1}});
    },
    scenarioListPrivate: function () {
        return Scenarios.find({scope: 'Private'}, {sort: {creation_date: -1}});
    }
});

Template.scenarioRow.helpers({
    activeScenario: function () {
        if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
            return Session.get('active_scenario');
        }
    },
    isJoined: function () {
        return isUserJoined(this._id);
    }
});

Template.scenarioRow.events({
    'click .scenario-name': function (evt, tmpl) {
        if (isUserJoined(this._id)) {
            if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
                Session.update('active_scenario', tmpl.data._id);
            } else {
                Session.setAuth('active_scenario', tmpl.data._id);
            }
            $('.scenario-name').removeClass('active-scenario');
            $(evt.currentTarget).find('i').addClass('active-scenario');
        }
    },
    'click .join-scenario': function (evt, tmpl) {
        if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
            Session.update('active_scenario', tmpl.data._id);
        } else {
            Session.setAuth('active_scenario', tmpl.data._id);
        }
        $('.scenario-name').removeClass('active-scenario');
        $(evt.currentTarget).find('i').addClass('active-scenario');

        Scenarios.update({_id: this._id}, {
            $push: {
                'guests': {
                    'userid': Meteor.userId(),
                    'complete_values': 'No'
                }
            }
        });
    },
    'click .evaluate': function (evt, tmpl) {
        if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
            Session.update('active_scenario', tmpl.data._id);
        } else {
            Session.setAuth('active_scenario', tmpl.data._id);
        }
    },
    'click .results': function (evt, tmpl) {
        if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
            Session.update('active_scenario', tmpl.data._id);
        } else {
            Session.setAuth('active_scenario', tmpl.data._id);
        }
    }
});

AutoForm.hooks({
    insertScenarioForm: {
        after: {
            insert: function (error, result, template) {
                if (!error) {
                    if (!(Session.get('active_scenario') === undefined || Session.get('active_scenario') === null)) {
                        Session.update('active_scenario', result);
                    } else {
                        Session.setAuth('active_scenario', result);
                    }
                    $('#addScenario').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    Router.go('objectives');
                } else {
                    return false;
                }
            }
        }
    }
});