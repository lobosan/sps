if (Meteor.isClient) {
    Session.setDefault('appName', 'Scenario Planning System');

    Template.menu.helpers({
        appName: function () {
            return Session.get('appName');
        }
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });
}