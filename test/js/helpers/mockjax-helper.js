'use strict';

$.mockjaxSettings.logging = false;
$.mockjaxSettings.contentType = 'application/json';

$.mockjax({
    url: '*api/1.0/notifications',
    type: 'GET',
    responseText: {
        'notifications': [
            { id: 1, title: 'Notification 1', isRead: false },
            { id: 2, title: 'Notification 2', isRead: false },
            { id: 3, title: 'Notification 3', isRead: false },
            { id: 4, title: 'Notification 4', isRead: false }
        ]
    }
});

$.mockjax({
    url: '*api/1.0/notifications/*',
    type: 'PUT',
    response: function (settings) {
        this.responseText = settings.data;
    }
});

$.mockjax({
    url: '*api/1.0/notifications/*',
    type: 'DELETE',
    status: 204
})