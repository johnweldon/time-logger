var debug = true;

window.TimeLogger = Ember.Application.create({
    /*
     LOG_ACTIVE_GENERATION: true,
     LOG_RESOLVER: true
     */
});

TimeLogger.ApplicationAdapter = DS.FixtureAdapter.extend();

TimeLogger.Router.map(function () {
    this.resource('timelogger', {path: '/'});
});

TimeLogger.TimeloggerRoute = Ember.Route.extend({
    model: function () {
        return {
            records: this.store.find('record'),
            projects: this.store.find('project')
        };
    }
});

var debugLog = function () {
    if (debug) {
        console.log(arguments);
    }
};

/**
 * @return {boolean}
 */
TimeLogger.TimeCompare = function (begin, end, increment) {
    var granularity = increment || 15;
    if (!begin || !end) {
        debugLog("FAIL: missing time");
        return false;
    }
    var lhs = begin.split(':');
    var rhs = end.split(':');
    if (lhs.length != rhs.length && lhs.length != 2) {
        debugLog("FAIL: malformed time");
        return false;
    }
    var
        beginHour = parseInt(lhs[0], 10),
        beginMin = parseInt(lhs[1], 10),
        endHour = parseInt(rhs[0], 10),
        endMin = parseInt(rhs[1], 10);

    if (beginMin % granularity != 0 || endMin % granularity != 0) {
        debugLog("FAIL: time must be in increment of "+granularity+" minutes");
        return false;
    }
    if (beginHour > endHour) {
        debugLog("FAIL: begin is after end")
        return false;
    }
    if (beginHour == endHour && beginMin >= endMin) {
        debugLog("FAIL: begin is after end")
        return false;
    }

    return true;
};

TimeLogger.TimeloggerController = Ember.Controller.extend({
    actions: {
        createRecord: function () {
            var notes = this.get('newNote');
            var begin = this.get('newBegin');
            var end = this.get('newEnd');
            var date = this.get('newDate');
            var project = this.get('newProject') || '';

            debugLog(date, begin, end);

            if (!notes || !notes.trim() || !TimeLogger.TimeCompare(begin, end)) {
                return;
            }

            var record = this.store.createRecord('record', {
                notes: notes,
                begin: begin,
                end: end,
                project: project.trim()
            });

            this.set('newNote', '');
            this.set('newBegin', end);
            this.set('newEnd', end);
            record.save();
        }
    }
});

TimeLogger.Record = DS.Model.extend({
    name: DS.attr('string'),
    begin: DS.attr('string'),
    end: DS.attr('string'),
    notes: DS.attr('string'),
    project: DS.attr('string'),
    date: DS.attr('string')
});

TimeLogger.Project = DS.Model.extend({
    name: DS.attr('string')
});

TimeLogger.Tag = DS.Model.extend({
    name: DS.attr('string')
});

TimeLogger.Record.FIXTURES = [
    {
        id: 1,
        name: 'one',
        begin: '10:00',
        end: '10:15',
        notes: 'what I did',
        project: 'ember'
    }, {
        id: 2,
        name: 'two',
        begin: '10:15',
        end: '11:30',
        notes: 'another one',
        project: 'ember'
    }, {
        id: 3,
        name: 'three',
        begin: '11:30',
        end: '14:00',
        notes: 'different one',
        project: 'handlebars'
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