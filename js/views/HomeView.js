
define(['backbone', 'jquery', 'views/PageView', 'text!templates/home.html'], function(Backbone, $, PageView, homeTemplate) {
    var HomeView = PageView.extend({

        id: 'home-view',

        template:_.template(homeTemplate),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return HomeView;
});

