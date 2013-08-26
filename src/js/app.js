App = Ember.Application.create();

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
                notification.set('isRead', true);
            }
        }, this);
    },

    remove: function (notification) {
        this.removeObject(notification);
        notification.deleteRecord();
    },

    unread: function () {
        return this.filterProperty('isRead', false).length;
    }.property('this.@each.isRead')
});

App.IndexController = Ember.Controller.extend({
    needs: 'notifications'
});

App.Store = DS.Store.extend({
    adapter: DS.FixtureAdapter.create()
});

App.Notification = DS.Model.extend({
    title: DS.attr('string'),
    isRead: DS.attr('boolean')
});

App.Notification.FIXTURES = [
    { id: 1, title: 'Notification 1', isRead: false },
    { id: 2, title: 'Notification 2', isRead: false },
    { id: 3, title: 'Notification 3', isRead: false },
    { id: 4, title: 'Notification 4', isRead: false }
];
