'use strict';

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.Test.adapter = Ember.Test.MochaAdapter.create();

Ember.testing = true;

Ember.RSVP.configure('onerror', function(e) {
    console.log(e.message);
    console.log(e.stack);
});

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
