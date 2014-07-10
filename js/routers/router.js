
define(['backbone', 'jquery', 'views/MainView', 'models/CurrentPosition'],
        function(Backbone, $, MainView, CurrentPosition) {
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
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos){
                    CurrentPosition.set('coords', pos.coords);
                    CurrentPosition.set('timestamp', pos.timestamp);
                }, function(err) {
                    console.log("Failed to get position");
                    console.log(err);
                },
                {maximumAge: 500000, enableHighAccuracy: true, timeout: 10000}
                );
            }
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
