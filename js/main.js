console.log("In main.js");

require.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'jquery-mobile': '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2'
    },
    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }
});

require(['backbone', 'jquery'], function(Backbone, $) {

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
});

// Force jquery-mobile to load, but load jqm-config first
require(['backbone', 'jquery', 'routers/router', 'jqm-config', 'jquery-mobile'], function(Backbone, $, Router) {

    $(document).ready(function () {
        console.log('document ready');
        var router = new Router();
        Backbone.history.start();
    });
});
