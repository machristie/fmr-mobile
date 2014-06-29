
define(['backbone', 'jquery', 'views/PageView', 'text!templates/main.html'], function(Backbone, $, PageView, mainTemplate) {
    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return MainView;
});

