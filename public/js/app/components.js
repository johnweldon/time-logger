//noinspection JSUnusedGlobalSymbols
TimeLogger.TimeRecordEditComponent = Ember.Component.extend({
    actions: {
        createTimeRecord: function () {
            var item = this.get('item');
            var date = item.get('date'),
                begin=item.get('begin'),
                end=item.get('end'),
                notes=item.get('notes'),
                project=item.get('project');
            var timeFmt='HH:mm';
            if (!notes || !notes.trim() || !moment(end, timeFmt).isAfter(moment(begin, timeFmt))) {
                return;
            }
            TU.debugLog('here');
            this.sendAction();

        },
        updateTimeRecord: function () {
            TU.debugLog("updateTimeRecord", arguments, this);
            var item = this.get('item');
            var project = item.get('project');
            TU.debugLog(project);
        },
        cancelTimeRecord: function () {
            TU.debugLog("cancelTimeRecord", arguments, this);
            var item = this.get('item');
            var project = item.get('project');
            TU.debugLog(project);
        }
    }
});
//noinspection JSUnusedGlobalSymbols
TimeLogger.TimeRecordDisplayComponent = Ember.Component.extend({
    actions: {
        editTimeRecord: function () {
            TU.debugLog("editTimeRecord", arguments, this);
            var item = this.get('item');
            var project = item.get('project');
            TU.debugLog(project);
        }
    }
});
