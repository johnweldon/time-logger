TimeLogger.Util = {
    debug: true,
    debugLog: function () {
        if (this.debug) {
            console.log(arguments);
        }
    },
    currentTimeRounded: function (granularity) {
        var g = granularity || 15;
        var now = moment();
        var minute = now.minute();
        now.set('minute', minute - (minute % g));
        return now.format('HH:mm');
    },
    currentDateString: function () {
        return moment().format('YYYY-MM-DD')
    },
    allTimeRecords: function () {
        return function (rec) {
            return !rec.get('isNew');
        }
    },
    matchingTimeRecords: function (dateunit) {
        dateunit = dateunit || 'day';
        return function (rec) {
            return moment(rec.get('date')).isSame(moment(), dateunit) && !rec.get('isNew');
        };
    }

};
var TU = TimeLogger.Util;
