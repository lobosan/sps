Meteor.publish('scenarioList', function () {
    return Scenarios.find({});
    /*return Scenarios.find({
     $or: [
     {author: this.userId},
     {scope: 'Public'},
     {'guests.userid': this.userId}
     ]
     }
     );*/
});

Meteor.methods({
    updateCompletedValues: function (active_scenario, guest_id, complete_values) {
        Scenarios.update(
            {'_id': active_scenario, 'guests.userid': guest_id},
            {$set: {'guests.$.complete_values': complete_values}}
        );
    },
    notifyNextTurn: function (scenario_name, scenario_description, guests_ids) {
        var users = Meteor.users.find({'_id': {$in: guests_ids}}).fetch();

        var emails = [];
        for (var i = 0; i < users.length; i++) {
            emails.push(users[i].emails[0].address);
        }

        var html = "<h1>Scenario Planning System</h1>"
            + "The scenario <b>" + scenario_name + "</b> has started a new turn<br><br>"
            + "Description: " + scenario_description + "<br><br>"
            + "Go to the platform to select the scenario described above and continue your <a href='http://sps.meteor.com'>evaluation</a>";

        if (emails.length >= 1) {
            this.unblock();

            if (!Meteor.user()) throw new Meteor.Error(403, "not logged in");

            Email.send({
                to: emails,
                from: Meteor.user().emails[0].address,
                subject: "SPS - Next turn notification",
                html: html
            });
        }
    }
});