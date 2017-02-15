import {View} from "backbone";
import Backbone from "backbone";
import catTemplate from "./cats_element_template.html";

const CatView = View.extend({
    template: catTemplate,
    events: {
        "click .show-more": "openCatView"
    },

    render: function (model) {
        this.$el.html(this.template({"model": model}));
        return this;
    },

    openCatView: function () {
        Backbone.history.navigate(`cats/${this.model.id}`, true);
    }
});

export default CatView;