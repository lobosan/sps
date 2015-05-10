Template.results.influenceDependence = function() {
    var results = Template.instance();
    var calculations = results.calculations();
    var scenarioTurn = Scenarios.findOne({_id: Session.get('active_scenario')}).turn;
    var numObj = ConnectivityMatrix.find({scenario_id: Session.get('active_scenario'), turn: scenarioTurn, user_id: Meteor.userId()}, {sort: {created_at: 1}}).count();

    return {
        chart: {
            type: 'scatter'
        },
        title: {
            text: 'Influence / Dependence'
        },
        subtitle: {
            text: Meteor.user().username
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Dependence'
            },
            min: 0,
            max: numObj,
            plotLines: [{
                color: 'rgba(50, 78, 162, 0.8)',
                value: numObj / 2,
                width: 1
            }]
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Influence'
            },
            min: 0,
            max: numObj,
            gridLineColor: 'transparent',
            plotLines: [{
                value: numObj / 2,
                color: 'rgba(0, 140, 0, 0.6)',
                width: 1
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 3,
            y: 5,
            floating: true,
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        },
        series: [{
            name: 'Influence',
            color: 'rgba(223, 83, 83, .5)',
            data: calculations.infDepData
        }]
    };
};