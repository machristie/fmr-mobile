
define(['backbone', 'jquery', 'views/PageView'], function(Backbone, $, PageView) {
    var Page2View = PageView.extend({

        id: 'page2-view',

        template:_.template($('#page2').html()),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return Page2View;
});

