
define(['backbone', 'jquery', 'views/PageView', 'text!templates/page2.html'], function(Backbone, $, PageView, page2Template) {
    var Page2View = PageView.extend({

        id: 'page2-view',

        template:_.template(page2Template),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return Page2View;
});

