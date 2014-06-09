window.PageView = Backbone.View.extend({
    // Set up listeners, especially to Models
    startListening: function(){}
});

window.HomeView = window.PageView.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = window.PageView.extend({

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page2View = window.PageView.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "page2":"page2"
    },

    pages: {
        home: new HomeView(),
        page1: new Page1View(),
        page2: new Page2View()
    },

    prevPage: null,

    initialize:function () {
        // Handle back button throughout the application
        $(document).on('click', '.back', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(this.pages.home);
    },

    page1:function () {
        console.log('#page1');
        this.changePage(this.pages.page1);
    },

    page2:function () {
        console.log('#page2');
        this.changePage(this.pages.page2);
    },

    changePage:function (page) {
        page.startListening();
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            // We turned off $.mobile.autoInitializePage, but now that we've
            // added our first page to the DOM, we can now call initializePage.
            $.mobile.initializePage();
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
        if (this.prevPage){
            this.prevPage.stopListening();
        }
        this.prevPage = page;
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});
