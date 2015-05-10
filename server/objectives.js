Meteor.publish("objectiveList", function (active_scenario) {
    return Objectives.find({scenario_id: active_scenario});
});