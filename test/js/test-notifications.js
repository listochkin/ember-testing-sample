'use strict';

beforeEach(function () {
    App.reset();
})

it('Should go to index route', function () {
    visit('/').then(function () {
        expect(find('[data-test="application-title"]')[0].innerText).to.equal('Welcome to Ember.js');
        expect(find('[data-test="index"]')[0].innerText).to.equal('INDEX');
    });
});
