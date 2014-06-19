window.PageView = Backbone.View.extend({
    role: "page",
    attributes: function() {
        return {
            "data-role" : this.role
        };
    },
    // `enhance` assumes that view has already been rendered. Most likely this
    // method is called from `render`
    enhance: function() {
        this.$el.page().enhanceWithin();
        return this;
    }
});

window.HomeView = window.PageView.extend({

    id: 'home-view',

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        this.enhance();
        return this;
    }
});

window.Page1View = window.PageView.extend({

    id: 'page1-view',

    template:_.template($('#page1').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        this.enhance();
        return this;
    }
});

window.Page2View = window.PageView.extend({

    id: 'page2-view',

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        this.enhance();
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
        // Render and add page to DOM once
        if ($('#'+page.id).length === 0) {
            $('body').append(page.render().$el);
        }
        if (this.firstPage) {
            // We turned off $.mobile.autoInitializePage, but now that we've
            // added our first page to the DOM, we can now call initializePage.
            $.mobile.initializePage();
            this.firstPage = false;
        }
        $( ":mobile-pagecontainer" ).pagecontainer( "change", page.$el,
                { changeHash: false });
    }

});

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});
