import {View} from 'backbone';
import errorTemplate  from "../errors/error_template.html";
import catTemplate from "./cat_template.html";
import Constants from "../../utils/constants.js";
const CatView = View.extend({
    el: "#app",
    template: catTemplate,
    error_template: errorTemplate,

    initialize: function () {
        this.listenTo(this.model, "reset add change remove", this.render, this);
        this.model.fetch({error: this.onFail.bind(this)});
    },

    render: function () {
        this.$el.html(this.template({model: this.model}));
        return this;
    },

    onFail: function (response) {
        this.$el.html(this.error_template({"message": Constants.ERROR_GET_CAT + response.id}));
    }
});

export default CatView;