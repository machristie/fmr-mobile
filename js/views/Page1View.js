
define(['backbone', 'jquery', 'views/PageView'], function(Backbone, $, PageView) {
    var Page1View = PageView.extend({

        id: 'page1-view',

        template:_.template($('#page1').html()),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return Page1View;
});

