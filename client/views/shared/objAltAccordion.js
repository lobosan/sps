Template.objectivesAccordion.helpers({
    objectivesList: function () {
        var turn;
        if (Router.current().route.getName() === 'results') {
            turn = Session.get('turn')
        } else {
            turn = Scenarios.findOne({_id: Session.get('active_scenario')}).turn;
        }
        var objectives = Objectives.find({scenario_id: Session.get('active_scenario'), turn: {$lte: turn}}).fetch();
        var objectivesList = [];
        var index = 1;
        _.each(objectives, function (objective) {
            objectivesList.push({index: index, name: objective.name, description: objective.description});
            index++;
        });
        return objectivesList;
    }
});

Template.alternativesAccordion.helpers({
    alternativesList: function () {
        var turn;
        if (Router.current().route.getName() === 'results') {
            turn = Session.get('turn')
        } else {
            turn = Scenarios.findOne({_id: Session.get('active_scenario')}).turn;
        }
        var alternatives = Alternatives.find({scenario_id: Session.get('active_scenario'), turn: {$lte: turn}}).fetch();
        var alternativesList = [];
        var index = 1;
        _.each(alternatives, function (alternative) {
            alternativesList.push({index: index, name: alternative.name, description: alternative.description});
            index++;
        });
        return alternativesList;
    }
});