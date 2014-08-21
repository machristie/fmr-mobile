
define(['backbone', 'jquery', 'jquery-mobile'], function(Backbone, $) {

    var PageView = Backbone.View.extend({
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

    return PageView;
});
