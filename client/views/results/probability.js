Template.results.probability = function() {
    var results = Template.instance();
    var calculations = results.calculations();

    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Probability'
        },
        subtitle: {
            text: Meteor.user().username
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'Alternatives'
            },
            type: 'Alternatives',
            labels: {
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                },
                formatter: function() {
                    return 'a' + (parseInt(this.value) + 1);
                }
            }
        },
        yAxis: {
            title: {
                enabled: true,
                text: 'Probability'
            },
            labels: {
                formatter: function() {
                    return this.value + "%";
                }
            },
            min: 0
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.y:.2f}%'
        },
        series: [{
            name: 'Probability',
            data: calculations.probability,
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                align: 'center',
                format: '{point.y:.2f}%', // two decimal
                y: 30, // pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Helvetica, Arial, Verdana, sans-serif'
                }
            }
        }]
    };
};