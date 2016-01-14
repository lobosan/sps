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
   }
});