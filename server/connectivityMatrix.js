Meteor.publish("connectivityMatrix", function (active_scenario) {
    return ConnectivityMatrix.find({scenario_id: active_scenario});
});

Meteor.methods({
    removeAllConMat: function () {
        return ConnectivityMatrix.remove({});
    }
});