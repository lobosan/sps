Meteor.publish("actorList", function () {
    return Meteor.users.find({}, {fields: {"username": 1, "emails.address": 1}});
});

Meteor.methods({
    sendEmail: function (to, subject, html) {
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        // don’t allow sending email unless the user is logged in
        if (!Meteor.user())
            throw new Meteor.Error(403, "not logged in");

        // and here is where you can throttle the number of emails this user
        // is allowed to send per day

        Email.send({
            to: to,
            from: Meteor.user().emails[0].address,
            subject: subject,
            html: html
        });
    },
    scenarioHasActors: function (active_scenario, userids) {
        //Scenarios.update({_id: active_scenario}, {$set: {guests: userids}});
        _.each(userids, function (userid) {
            Scenarios.update({_id: active_scenario}, {
                $push: {
                    'guests': {
                        'userid': userid,
                        'complete_values': 'No'
                    }
                }
            });
            //Insert a new document if no match found
            /*Scenarios.update({_id: active_scenario}, {
                $set: {
                    'guests.$.userid': userid,
                    'guests.$.complete_values': 'No'
                }
            }, {upsert: true}, {validate: false});*/
        });
    }
});