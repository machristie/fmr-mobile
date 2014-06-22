
define(['backbone', 'jquery', 'views/PageView', 'text!templates/page1.html'], function(Backbone, $, PageView, page1Template) {
    var Page1View = PageView.extend({

        id: 'page1-view',

        template:_.template(page1Template),

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }
    });

    return Page1View;
});

