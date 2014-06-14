# Backbone.js + jQuery Mobile skeleton project

Based on coenraets [backbone-jquerymobile](https://github.com/ccoenraets/backbone-jquerymobile) project.

# TODO

* Turn off jQuery Mobile's DOM caching?
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

# PageView.startListening

To create new jQuery Mobile pages, extend `PageView` and implement/override
`startListening`. The way `startListening` should work is that, basically, all
of the `listenTo` calls you would have made in `initialize` you would put in
`startListening` instead. `startListening` is called by the Router before
`$.mobile.changePage` is called on that page. `stopListening` is called on a
page when transitioning to another page.

# Enhancing the PageView

Whenever `render()` is called, the *page* needs to be re-enhanced.  jQuery
Mobile will automatically enhance a *page* the first time it is changed to, but
after that you need to call it yourself. So most of the time for a PageView, you
implement render like so:

    render: function () {
        // do some rendering
        // ...
        this.$el.page().enhanceWithin();
        return this;
    }
