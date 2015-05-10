Meteor.publish("alternativeList", function (active_scenario) {
    return Alternatives.find({scenario_id: active_scenario});
});