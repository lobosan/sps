Scenarios = new Mongo.Collection("scenarios");

Scenarios.attachSchema(new SimpleSchema({
    author: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return this.userId;
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden",
            label: false
        }
    },
    name: {
        type: String,
        label: "Name",
        max: 300
    },
    description: {
        type: String,
        label: "Description",
        max: 1000,
        autoform: {
            type: "textarea"
        }
    },
    state: {
        type: String,
        allowedValues: [
            "Open",
            "Started",
            "Finished"
        ],
        defaultValue: "Open",
        autoform: {
            type: "hidden",
            label: false
        }
    },
    scope: {
        type: String,
        autoform: {
            type: "select-radio-inline",
            options: function () {
                return [
                    {label: "Public", value: "Public"},
                    {label: "Private", value: "Private"}
                ];
            }
        },
        defaultValue: "Public",
        label: "Scope"
    },
    creation_date: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else {
                this.unset();
            }
        },
        autoform: {
            type: "hidden",
            label: false
        }
    },
    guests: {
        type: [Object],
        defaultValue: [],
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true
    },
    'guests.$.userid': {
        type: String
    },
    'guests.$.complete_values': {
        type: String
    },
    turn: {
        type: Number,
        defaultValue: 0,
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true
    }
}));