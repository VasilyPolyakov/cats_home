/**
 * Created by b000blik on 14.02.2017.
 */
import {View} from "backbone";
import Cats from "../../collections/Cats.js";
import sortingTemplate from "./sorting_template.html";
let Search_View = View.extend({
    el: "#sorting-container",
    template: sortingTemplate,
    events: {
        "click #price-sort": "priceSort"
    },
    collection: Cats,

    initialize: function () {
        this.$el.html(this.template);
    },

    render: function () {
        const sortingOrder = this.collection.state.order;
        this.$el.html(this.template);
        this.setSortIcon(sortingOrder);
        return this;
    },

    priceSort: function () {
        const sortingOrder = this.collection.state.order * -1;
        this.collection.state.order = sortingOrder;
        this.setSortIcon(sortingOrder);
        this.collection.setSorting("price", sortingOrder);
        this.collection.fullCollection.sort();
    },

    setSortIcon: function (sortingOrder) {
        if (sortingOrder === 1) {
            this.$el.find("#price-sort").removeClass("sort-ascent").addClass("sort-descent");
        } else if(sortingOrder === -1) {
            this.$el.find("#price-sort").removeClass("sort-descent").addClass("sort-ascent");
        }
    }
});

export default Search_View;