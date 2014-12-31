var debug = true;
var moment = moment || function () {
        debugLog('moment.js not included');
    };

window.TimeLogger = Ember.Application.create({
    LOG_ACTIVE_GENERATION: false,
    LOG_RESOLVER: false,
    LOG_TRANSITIONS: true
});

TimeLogger.ApplicationAdapter = DS.FixtureAdapter.extend();

TimeLogger.Router.map(function () {
    this.resource('timelogger', {path: '/'}, function () {
        this.route('today');
    });
});

TimeLogger.TimeloggerRoute = Ember.Route.extend({
    model: function () {
        var draft = this.store.createRecord('timerecord');
        draft.set('isEditing',true);
        draft.set('isDraft',true);
        return {
            draft: draft,
            records: this.store.find('timerecord'),
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
            records: this.store.filter('timerecord', function (rec) {
                return new Date(rec.get('date').split('-')).toDateString() === new Date().toDateString()
            }),
            projects: this.store.find('project')
        }
    },
    renderTemplate: function (controller) {
        this.render('timelogger/index', {controller: controller});
    }
});

var debugLog = function () {
    if (debug) {
        console.log(arguments);
    }
};

//noinspection JSUnusedGlobalSymbols
TimeLogger.TimeloggerController = Ember.ObjectController.extend({
    actions: {
        createTimeRecord: function () {
            var model = this.get('model');
            var draft = model.draft;
            debugLog(draft);
            var date = this.get('newDate');
            var project = this.get('newProject') || '';
            var begin = this.get('newBegin');
            var end = this.get('newEnd');
            var notes = this.get('newNotes');

            debugLog(date, begin, end, project, notes);

            var timeFmt = 'HH:mm';
            if (!notes || !notes.trim() || !moment(end, timeFmt).isAfter(moment(begin, timeFmt))) {
                return;
            }

            var rec = this.store.createRecord('timerecord', {
                notes: notes,
                begin: begin,
                end: end,
                project: project.trim(),
                date: date
            });

            this.set('newBegin', end);
            this.set('newEnd', end);
            rec.save();
        }
    },
    newDate: new Date()
});

//noinspection JSUnusedGlobalSymbols
TimeLogger.TimerecordController = Ember.ObjectController.extend({
    actions: {
        editTimeRecord: function () {
            this.set('isEditing', true);
        },
        saveTimeRecord: function () {
            this.set('isEditing', false);
            this.get('model').save();
        },
        cancelTimeRecord: function () {
            var r = this.get('model');
            r.deleteRecord();
            r.save();
        },
        cancelUpdate: function () {
            this.set('isEditing', false);
        }
    },
    isEditing: false
});

TimeLogger.currentTimeRounded = function (granularity) {
    var g = granularity || 15;
    var now = moment();
    var minute = now.minute();
    now.set('minute', minute - (minute % g));
    return now.format('HH:mm');
};

TimeLogger.Timerecord = DS.Model.extend({
    begin: DS.attr('string', {defaultValue: TimeLogger.currentTimeRounded()}),
    end: DS.attr('string', {defaultValue: TimeLogger.currentTimeRounded()}),
    notes: DS.attr('string'),
    project: DS.attr('string'),
    date: DS.attr('string', {
        defaultValue: function () {
            return moment().format('YYYY-MM-DD')
        }
    })
});

TimeLogger.TimerecordView = Ember.View.extend({
    templateName: 'timerecord',
    model: new TimeLogger.Timerecord(),
    projects: []
});


TimeLogger.Project = DS.Model.extend({
    name: DS.attr('string')
});

TimeLogger.Tag = DS.Model.extend({
    name: DS.attr('string')
});

TimeLogger.Timerecord.FIXTURES = [
    {
        id: 1,
        name: 'one',
        begin: '10:00',
        end: '10:15',
        notes: 'what I did',
        project: 'ember',
        date: '2014-12-30'
    }, {
        id: 2,
        name: 'two',
        begin: '10:15',
        end: '11:30',
        notes: 'another one',
        project: 'ember',
        date: '2014-12-30'
    }, {
        id: 3,
        name: 'three',
        begin: '11:30',
        end: '14:00',
        notes: 'different one',
        project: 'handlebars',
        date: '2014-12-30'
    }
];

TimeLogger.Project.FIXTURES = [
    {id: 1, name: 'ember'},
    {id: 2, name: 'handlebars'}
];

TimeLogger.Tag.FIXTURES = [
    {id: 1, name: 'meeting'},
    {id: 2, name: 'coding'}
];

$('body').on('keydown', 'input, select', function (e) {
    var focusable, next;
    if (e.keyCode == 13) {
        focusable = $('#timeloggerapp').find('input,a,select,button,textarea').filter(':visible');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        }
        return false;
    }
});

$(function () {
    $('#new-date').val(moment().format('YYYY-MM-DD'));
    $('#new-note').focus();
});