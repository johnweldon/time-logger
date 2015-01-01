TimeLogger.ApplicationAdapter = DS.FixtureAdapter.extend();

TimeLogger.Timerecord = DS.Model.extend({
    date: DS.attr('string', {defaultValue: TU.currentDateString()}),
    begin: DS.attr('string', {defaultValue: TU.currentTimeRounded()}),
    end: DS.attr('string', {defaultValue: TU.currentTimeRounded()}),
    notes: DS.attr('string'),
    project: DS.attr('string')
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
        project: 'project 1',
        date: '2014-12-20'
    }, {
        id: 2,
        name: 'two',
        begin: '10:15',
        end: '11:30',
        notes: 'another one',
        project: 'project 1',
        date: '2014-12-30'
    }, {
        id: 3,
        name: 'three',
        begin: '11:30',
        end: '14:00',
        notes: 'different one',
        project: 'project 2',
        date: '2015-01-01'
    }
];

TimeLogger.Project.FIXTURES = [
    {id: 1, name: 'project 1'},
    {id: 2, name: 'project 2'}
];

TimeLogger.Tag.FIXTURES = [
    {id: 1, name: 'meeting'},
    {id: 2, name: 'coding'}
];

