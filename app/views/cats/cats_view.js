import {View} from "backbone";
import $ from "jquery";
import Cats from "../../collections/Cats.js";
import CatView from "../cats_element/cats_element_view.js";
import SortingView from "../sorting/sorting_view.js";
import PaginationView from "../pagination/pagination_view";
import catsTtemplate from "./cats_template.html";
import errorTemplate from "../errors/error_template.html";
import Constants from "../../utils/constants.js";
import SearchView from "../search/search_view";

const CatsView = View.extend({
    el: "#app",
    template: catsTtemplate,
    error_template: errorTemplate,
    collection: Cats,

    initialize: function () {
        this.$el.html(this.template());
        let searchView = new SearchView({searchableAttrs: ["name", "breed"], searchableMethods: ["getAgeString", "getGender", "getPrice"]});
        this.$el.find("#search-container").append(searchView.render().el);
        let sortingView = new SortingView();
        this.$el.find("#sorting-container").append(sortingView.render().el);
        this.listenTo(Cats, "reset", this.render, this);
        this.paginationView = new PaginationView({collection: Cats});
        this.$el.find("#pagination").append(this.paginationView.update().el);
        Cats.fetch({error: this.onFail.bind(this), success: this.onSuccess.bind(this)});

    },

    render: function () {
        $("#cat-item-wrapper").html("");
        this.paginationView.update();
        this.collection.each(function (cat) {
            let catView = new CatView({model: cat});
            this.$el.find(".cat-item-wrapper").append(catView.render(cat).el);
        }, this);
        return this;
    },

    onFail: function (response) {
        this.$el.html(this.error_template({"message": Constants.ERROR_GET_CATS_COLLECTION + response.statusText}));
    },

    onSuccess: function () {
        this.collection.setSorting("price");
        this.collection.fullCollection.sort();
    }
});

export default CatsView;