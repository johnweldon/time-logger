TimeLogger.NavigationView = Ember.View.extend({
    templateName: 'navigation'
});

TimeLogger.TimerecordView = Ember.View.extend({
    templateName: 'timerecord',
    timerecord: {},
    projects: []
});

TimeLogger.TimerecordeditView = Ember.View.extend({
    templateName: 'timerecordedit',
    timerecord: {},
    projects: []
});

TimeLogger.TimerecorddisplayView = Ember.View.extend({
    templateName: 'timerecorddisplay',
    timerecord: {}
});


