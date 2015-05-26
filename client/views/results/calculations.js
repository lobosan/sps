calculations = function(turn) {

    var conM = ConnectivityMatrix.find({scenario_id: Session.get('active_scenario'), turn: turn, user_id: Meteor.userId()}, {sort: {created_at: 1}}).fetch();
    var conP = ProbabilityMatrix.find({scenario_id: Session.get('active_scenario'), turn: turn, user_id: Meteor.userId()}, {sort: {created_at: 1}}).fetch();

    /*** Step 1 by user ***/
    var influence = function (conM) {
        var influence = [];
        for (var i = 0; i < conM.length; i++) {
            var temp = [];
            for (var j = 1; j <= conM.length; j++) {
                if ((conM[i]['o' + j]) != 'x')
                    temp.push(conM[i]['o' + j]);
            }
            var sum = _.reduce(temp, function (memo, num) {
                return parseInt(memo) + parseInt(num);
            }, 0);
            influence.push(sum);
        }
        return influence;
    };

    var dependence = function (conM) {
        var dependence = [];
        var tempDep = [];
        for (var i = 0; i < conM.length; i++) {
            tempDep.push(_.pluck(conM, 'o' + (i + 1)));
        }
        _.each(tempDep, function (dep) {
            dependence.push(_.reduce(_.without(dep, 'x'), function (memo, num) {
                return parseInt(memo) + parseInt(num);
            }, 0));
        });
        return dependence;
    };

    /*var vector1 = function (inf, dep) {
     var vector1 = [];
     for (var k = 0; k < inf.length; k++) {
     vector1.push((inf[k] + dep[k]) / 2);
     }
     return vector1;
     };*/

    var vector2 = function (inf, dep) {
        var vector2 = [];
        for (var k = 0; k < inf.length; k++) {
            vector2.push(Math.sqrt(Math.pow(inf[k], 2) + Math.pow(dep[k], 2)).toFixed(2));
        }
        return vector2;
    };

    var vector3 = function (inf, dep) {
        var vector3 = [];
        var infProm = inf.length / 2;
        for (var m = 0; m < inf.length; m++) {
            if (inf[m] > (infProm) && dep[m] < infProm) vector3.push(1);
            else if (inf[m] > (infProm) && dep[m] > infProm) vector3.push(0.75);
            else if (inf[m] < (infProm) && dep[m] > infProm) vector3.push(0.5);
            else vector3.push(0.25);
        }
        return vector3;
    };

    var vector4 = function (inf, vect2, vect3) {
        var vector4 = [];
        for (var n = 0; n < inf.length; n++) {
            vector4.push((vect2[n] * vect3[n]).toFixed(2));
        }
        return vector4;
    };

    /*** Step 2 by user ***/
    var evi = function (conP, conM, vect4) {
        var evi = [];
        for (var p = 0; p < conP.length; p++) {
            var tempEvi = 0;
            for (var q = 0; q < conM.length; q++) {
                tempEvi += ((parseInt(conP[p]['p' + (q + 1)])) / 100) * vect4[q];
            }
            evi.push(tempEvi.toFixed(2));
        }
        return evi;
    };

    //Influence - Dependence
    var influenceData = influence(conM);
    var dependenceData = dependence(conM);
    var infDepData = [];
    for (var r = 0; r < influenceData.length; r++) {
        infDepData[r] = [influenceData[r], dependenceData[r]];
    }

    //Probability
    var vector2Data = vector2(influenceData, dependenceData);
    var vector3Data = vector3(influenceData, dependenceData);
    var vector4Data = vector4(influenceData, vector2Data, vector3Data);
    var eviData = evi(conP, conM, vector4Data);

    var probability = [];
    var sumEvi = _.reduce(eviData, function (memo, num) {
        return parseFloat(memo) + parseFloat(num);
    }, 0);
    _.each(eviData, function (e) {
        probability.push(((e / sumEvi) * 100).toFixed(2));
    });

    return {
        infDepData: infDepData,
        probability: probability.map(Number)
    };
};