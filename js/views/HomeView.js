
define(['backbone', 'jquery', 'views/PageView'], function(Backbone, $, PageView) {
    var HomeView = PageView.extend({

        id: 'home-view',

        template:_.template($('#home').html()),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return HomeView;
});

