
define(['backbone', 'jquery', 'views/MainView', 'views/EditRoutePage', 'models/Route', 'models/CurrentPosition'],
        function(Backbone, $, MainView, EditRoutePage, Route, CurrentPosition) {
            "use strict";
    var AppRouter = Backbone.Router.extend({

        routes:{
            "":"edit",
            "map/:destination(/:start)":"main",
            "edit":"edit"
        },

        currentRoute: new Route(),

        // Cache and reuse pages
        pages: {},

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.currentPage = null;
            this.pages = {
                main: new MainView({model: this.currentRoute}),
                editRoute: new EditRoutePage({model: this.currentRoute})
            };
            this.listenTo(this.pages.editRoute, "routeEditSubmitted", this.routeEditSubmitted);
            $(document).on( "pagecontainershow", _.bind(this.handlePageContainerShow, this));
        },

        main:function (destination, start) {
            // update currentRoute based on given destination and start
            this.currentRoute.set({
                'start': start,
                'destination': destination,
                'useCurrentLocation': (start == null)
            });
            this.changePage(this.pages.main);
        },

        edit: function() {
            this.changePage(this.pages.editRoute);
        },

        changePage:function (page) {
            // Render and add page to DOM once
            if ($('#'+page.id).length === 0) {
                $('body').append(page.render().$el);
            }
            if (this.currentPage){
                this.currentPage.$el.hide();
            }
            page.$el.show();
            page.show();
            this.currentPage = page;
        },

        routeEditSubmitted: function(event) {
            var fragment = "map/" + encodeURIComponent(this.currentRoute.get('destination'));
            if (this.currentRoute.get('start')){
                fragment += "/" + encodeURIComponent(this.currentRoute.get('start'));
            }
            this.navigate(fragment, {trigger: true});
        },

        handlePageContainerShow: function (event, ui) {
            // Figure out what page we are showing and call 'PageView.show' on it
            // TODO: JQM 1.4.3 has ui.toPage, which would be preferred to getActivePage
            var activePage = $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" );
            _.each(this.pages, function(page) {
                if( activePage.get(0) === page.el ){
                    page.show(event, ui);
                }
            });
        }

    });

    return AppRouter;
});
