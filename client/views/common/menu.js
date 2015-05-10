Template._loginButtonsLoggedInDropdown.rendered = function () {
    $('.dropdown-toggle').prepend('<i class="glyphicon glyphicon-user"></i> ');
};

Template.menu.helpers({
   'evaluateScenario': function () {
       return Scenarios.findOne({_id: Session.get('active_scenario')});
   }
});