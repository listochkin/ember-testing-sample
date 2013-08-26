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

describe('Notifications', function () {
    it('Should go to /notifications', function () {
        visit('/notifications').then(function () {
            expect(find('[data-test="title"]').length).to.equal(4);
        });
    });

    it('Should mark notifications as read', function () {
        visit('/notifications').then(function () {
            var first = find('[data-test="isRead"]')[0].innerText;
            expect(first).to.equal("false");
        }).visit('/').visit('/notifications').then(function () {
            var first = find('[data-test="isRead"]')[0].innerText;
            expect(first).to.equal("true");
        });
    });

    it('Should remove notification', function () {
        visit('/notifications').click('[data-test="delete"]:first').then(function () {
            expect(find('ul li').length).to.equal(3);
        });
    });

    it('Should show the unread counter', function () {
        visit('/notifications').then(function () {
            expect(find('[data-test="unread"]')[0].innerText).to.equal('4');
        }).then(function () {
            var notification = App.Notification.find(1);
            notification.set('isRead', true);
            return wait();
        }).then(function () {
            expect(find('[data-test="unread"]')[0].innerText).to.equal('3');
        });
    });

    it('Should show unread counter on other routes', function () {
        visit('/').then(function () {
            expect(find('[data-test="notifications"]')[0].innerText).to.equal('4');
        });
    });
});
