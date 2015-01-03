//noinspection JSUnusedGlobalSymbols
TimeLogger.TimeloggerController = Ember.ObjectController.extend({
    actions: {
        createTimeRecord: function () {
            var date = this.get('newDate');
            var project = this.get('newProject') || '';
            var begin = this.get('newBegin');
            var end = this.get('newEnd');
            var notes = this.get('newNotes');

            TU.debugLog(date, begin, end, project, notes);

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
        },
        editTimeRecord:function(){},
        saveTimeRecord:function(){},
        cancelTimeRecord:function(){},
        cancelUpdate:function(){}
    },
    isEditing: true
});

//noinspection JSUnusedGlobalSymbols
TimeLogger.TimerecordController = Ember.ObjectController.extend({
    actions: {
        createTimeRecord: function(item){
            TU.debugLog('createTimeRecord',this,item);
        },
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


