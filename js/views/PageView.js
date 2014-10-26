
define(['backbone', 'jquery'], function(Backbone, $) {

    var PageView = Backbone.View.extend({

        // Override to add logic to execute on page is shown
        show: function(event, ui) {}
    });

    return PageView;
});
