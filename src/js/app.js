'use strict';

window.App = Ember.Application.create();

App.Router.map(function() {
    this.resource('notifications');
});

App.NotificationsRoute = Ember.Route.extend({
    deactivate: function () {
        this.get('controller').markAsRead();
    }
});

App.NotificationsController = Ember.ArrayController.extend({
    init: function () {
        this._super();
        this.set('content', App.Notification.find());
    },

    markAsRead: function () {
        this.forEach(function action(notification) {
            if (!notification.get('isRead')) {
                var store = notification.get('store');
                var transaction = store.transaction();
                transaction.add(notification);
                notification.set('isRead', true);
                transaction.commit();
            }
        }, this);
    },

    remove: function (notification) {
        this.removeObject(notification);
        var store = notification.get('store');
        var transaction = store.transaction();
        transaction.add(notification);
        notification.deleteRecord();
        transaction.commit();
    },

    unread: function () {
        return this.filterProperty('isRead', false).length;
    }.property('this.@each.isRead')
});

App.IndexController = Ember.Controller.extend({
    needs: 'notifications'
});

App.Adapter = DS.RESTAdapter.extend({
    namespace: 'api/1.0'
});

App.Store = DS.Store.extend({
    adapter: 'App.Adapter'
});

App.Notification = DS.Model.extend({
    title: DS.attr('string'),
    isRead: DS.attr('boolean')
});
