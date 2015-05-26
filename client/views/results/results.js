Template.results.helpers({
    turns: function () {
        var turn = Scenarios.findOne({_id: Session.get('active_scenario')}).turn;
        var turns = [];
        for (var i = 1; i <= turn; i++) {
            turns.push({turn: i});
        }
        return turns;
    }
});

Template.results.onRendered(function () {
    Tracker.autorun(function () {
        if (this.$('#turn').val() == '')
            Session.set('turn', Scenarios.findOne({_id: Session.get('active_scenario')}).turn);
        var results = calculations(Session.get('turn'));
        buildInfluenceDependenceReactive(results.infDepData);
        buildProbabilityReactive(results.probability);
    });
});

Template.results.events({
    'click #complete_values': function (evt, tmpl) {
        Meteor.call('updateCompletedValues', Session.get('active_scenario'), Meteor.userId(), 'Yes');
    },
    'change #turn': function (evt, tmpl) {
        var turn = $(evt.target).val();
        Session.set('turn', parseInt(turn));
    }
});