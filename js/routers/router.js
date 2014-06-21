
define(['backbone', 'jquery'], function(Backbone, $) {
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

    return AppRouter;
});
