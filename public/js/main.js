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

var moment = moment || function () {
        TU.debugLog('moment.js not included');
    };


