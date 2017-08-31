/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs', function() {
            var url;

            if (allFeeds) {
                allFeeds.forEach(function(feed) {
                url = feed.url;

                expect(url).toBeDefined();
                expect(url).not.toBe('');
                });
            }
            else {
                window.alert("Jasmine: allFeeds not defined");
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            var name;

            if (allFeeds) {
                allFeeds.forEach(function(feed) {
                    name = feed.name;
                    expect(name).toBeDefined();
                    expect(name).not.toBe('');
                });
            }
            else {
                window.alert("Jasmine: allFeeds not defined");
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var element = $("body");
            var isHidden = element.hasClass("menu-hidden");

            expect(isHidden).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            var body = $("body");
            var isHidden;

            menuIcon.click();
            if (body) {
                isHidden = body.hasClass("menu-hidden");

                expect(isHidden).toBe(false);

                if (menuIcon) {
                    menuIcon.click();
                    isHidden = body.hasClass("menu-hidden");

                    expect(isHidden).toBe(true);
                }
                else {
                    window.alert("Jasmine: menuIcon not defined");
                }
            }
            else {
                window.alert("Jasmine: body not defined");
            }
          });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
            done();
           });
        });

        it('contain at least one entry', function(done) {
            var feed = $(".feed");
            var entries = feed.children(".entry-link");
            if (entries) {
                expect(entries.length).not.toBe(0);
            }
            else {
                window.alert("Jasmine: entries not defined");
            }
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var entry, newEntry;

        beforeEach(function(done) {
            loadFeed(0, function() {
                entry = $(".entry")[0];
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('contains new content', function(done) {
            newEntry = $(".entry")[0];
            if (newEntry && entry) {
                expect(newEntry).not.toBe(entry);
            }
            else {
                window.alert("Jasmine: entry not defined");
            }
            done();
        });
    });
}());
