TimeLogger.Router.map(function () {
    this.resource('timelogger', {path: '/'}, function () {
        this.route('today');
        this.route('thisweek');
        this.route('thismonth');
        this.route('thisyear');
    });

    this.resource('configuration', {path: '/configuration'}, function () {
    });
});

//noinspection JSUnusedGlobalSymbols
TimeLogger.TimeloggerRoute = Ember.Route.extend({
    model: function () {
        var self = this;
        var draft = self.store.createRecord('timerecord');
        draft.set('isEditing', true);
        self.store.find('timerecord');
        return {
            draft: draft,
            records: this.store.filter('timerecord', TU.allTimeRecords()),
            projects: this.store.find('project')
        };
    }
});

TimeLogger.TimeloggerIndexRoute = Ember.Route.extend({
    model: function () {
        return this.modelFor('timelogger');
    }
});

TimeLogger.TimeloggerTodayRoute = Ember.Route.extend({
    model: function () {
        return {
            records: this.store.filter('timerecord', TU.matchingTimeRecords('day')),
            projects: this.store.find('project')
        }
    },
    renderTemplate: function (controller) {
        this.render('timelogger/index', {controller: controller});
    }
});

TimeLogger.TimeloggerThisweekRoute = Ember.Route.extend({
    model: function () {
        return {
            records: this.store.filter('timerecord', TU.matchingTimeRecords('week')),
            projects: this.store.find('project')
        }
    },
    renderTemplate: function (controller) {
        this.render('timelogger/index', {controller: controller});
    }
});

TimeLogger.TimeloggerThismonthRoute = Ember.Route.extend({
    model: function () {
        return {
            records: this.store.filter('timerecord', TU.matchingTimeRecords('month')),
            projects: this.store.find('project')
        }
    },
    renderTemplate: function (controller) {
        this.render('timelogger/index', {controller: controller});
    }
});

TimeLogger.TimeloggerThisyearRoute = Ember.Route.extend({
    model: function () {
        return {
            records: this.store.filter('timerecord', TU.matchingTimeRecords('year')),
            projects: this.store.find('project')
        }
    },
    renderTemplate: function (controller) {
        this.render('timelogger/index', {controller: controller});
    }
});

