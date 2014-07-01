
define(['backbone', 'jquery', 'views/MainView'],
        function(Backbone, $, MainView) {
    var AppRouter = Backbone.Router.extend({

        routes:{
            "":"main"
        },

        pages: {
            main: new MainView()
        },

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
        },

        main:function () {
            this.changePage(this.pages.main);
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
