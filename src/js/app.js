App = Ember.Application.create();

App.Router.map(function() {
    this.resource('notifications');
});

App.NotificationsController = Ember.ArrayController.extend({
    init: function () {
        this._super();
        this.set('content', App.Notification.find());
    }
});

App.Store = DS.Store.extend({
    adapter: DS.FixtureAdapter.create()
});

App.Notification = DS.Model.extend({
    title: DS.attr('string')
});

App.Notification.FIXTURES = [
    { id: 1, title: 'Notification 1' },
    { id: 2, title: 'Notification 2' },
    { id: 3, title: 'Notification 3' },
    { id: 4, title: 'Notification 4' }
];
