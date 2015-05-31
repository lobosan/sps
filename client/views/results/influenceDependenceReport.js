buildInfluenceDependenceReactive = function (infDepData) {
    var numObj = ConnectivityMatrix.find({scenario_id: Session.get('active_scenario'), turn: Session.get('turn'), user_id: Meteor.userId()}, {sort: {created_at: 1}}).count();

    return new Highcharts.Chart({
        chart: {
            renderTo: 'influence-dependence',
            type: 'scatter'
        },
        title: {
            text: 'Connectivity'
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Dependence'
            },
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            minorTickLength: 0,
            tickLength: 0,
            min: 0,
            max: numObj,
            tickInterval: 1,
            plotLines: [{
                color: '#DDD',
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
            tickInterval: 1,
            gridLineColor: 'transparent',
            plotLines: [{
                value: numObj / 2,
                color: '#DDD',
                width: 1
            }]
        },
        legend: {
            enabled: false
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
            color: 'rgba(126,167,181,0.8)',
            data: infDepData
        }],
        credits: {
            enabled: false
        }
    });
};