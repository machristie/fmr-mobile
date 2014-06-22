# Backbone.js + jQuery Mobile skeleton project

Based on coenraets [backbone-jquerymobile](https://github.com/ccoenraets/backbone-jquerymobile) project.

# Installing

[Install bower](http://bower.io/), clone this repo, then run

    bower install

# Additional resources

* Check out: https://github.com/addyosmani/backbone-fundamentals/tree/gh-pages/practicals/todo-jqm-app

# $.mobile.autoInitializePage

`initializePage()` is needed to initialize the pagecontainer and set up
navigation events. It will try to find the first div with `data-role="page"` and
change to that page.  If there isn't a page in the DOM, it will create an
initial dummy page.

If `autoInitializePage` is true, then `initializePage()` is called when the DOM
is ready. So what we want to do is turn off `autoInitializePage` and call
`$.mobile.initializePage()` manually, when the Router first starts up and adds
the first page to the DOM.

That said, I don't know that there is any harm in letting `autoInitializePage`
left set to `true`.  It will add a dummy page to the DOM but you can ignore it
(or remove it).

# Enhancing the PageView

Whenever `render()` is called, the *page* needs to be re-enhanced.  jQuery
Mobile will automatically enhance a *page* the first time it is changed to, but
after that you need to call it yourself. So most of the time for a PageView, you
implement render like so:

    render: function () {
        // do some rendering
        // ...
        this.enhance(); // See PageView.enhance for details
        return this;
    }

In general, though, re-rendering and re-enhancing the entire page is discouraged
for performance reasons.

# PageView binding

Pages are not destroyed when navigated away from, instead they are merely
hidden. This means that they are still bound to models and may re-render, etc.
For performance reasons you might want to defer rendering until those pages are
visible again.  Here are some strategies:

1. You could check to see if your page is the current page by checking
   `$("body").pagecontainer( "getActivePage" )`. If not the active page, then
   you could store some information that would be used when your page becomes
   active again. You could listen to the router to know when your page is routed
   to.

       router.on("route:mypage", function(page) {});

   (Actually, if you are listening to the router, there is no need to make a
   call to `getActivePage`)

2. When the page isn't active, remove listeners and add them back again when the
   page is active again.  See #1 for how to figure out when your page is
   navigated to. This only works if you can afford to ignore events in the
   meantime (e.g., a clock), or you just re-render the parts of the page that
   are bound to models.
