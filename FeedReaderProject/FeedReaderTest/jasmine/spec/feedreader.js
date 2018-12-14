/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // makes sure all the URLs are defined
        it('url defined', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        // makes sure all the Names of the links are defined
        it('name defined', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    // Testing the sidebar menu
    describe('The menu', function () {

        // testing the menu is hidden when the site is first loaded
        it('is hidden', function () {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        // testing the toggle of the menu
        it('toggles on and off', function () {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Testing initial entries
    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        it('contains at least one single .entry element within .feed container', function (done) {
            expect($('.feed')).not.toBe(0);
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    // Testing New Feed Selection
    describe('New Feed Selection', function () {
        let stateOne;
        let stateTwo;

        beforeEach(function (done) {
            loadFeed(0, function () {
                stateOne = $('.feed')[0].innerText;
                loadFeed(1, function () {
                    stateTwo = $('.feed')[0].innerText;
                    done();
                });
            });
        });
        /* test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        it('changes content when new feed is loaded', function (done) {
            expect(stateOne).not.toEqual(stateTwo);
            done();
        });
    });
}());
