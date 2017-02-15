/**
 * Created by b000blik on 14.02.2017.
 */
import {View} from "backbone";
import _ from "lodash";
import Cats from "../../collections/Cats.js";
import searchTemplate from "./search_template.html";
const SearchView = View.extend({
    el: "#search-container",
    template: searchTemplate,
    events: {
        "keyup #search-input": "search"
    },
    collection: Cats,
    fields: ["name"],
    methodNames: [],

    makeRegExp: function (query) {
        return new RegExp(query.trim(), "i");
    },

    makeMatcher: function (query) {
        const regexp = this.makeRegExp(query);
        return function (model) {
            if (this.options.searchableAttrs) {
                for (let i = 0, l = this.options.searchableAttrs.length; i < l; i++) {
                    if (regexp.test(model.get(this.options.searchableAttrs[i]) + "")) return true;
                }
            }
            if (this.options.searchableMethods) {
                for (let i = 0, l = this.options.searchableMethods.length; i < l; i++) {
                    if (regexp.test(model[this.options.searchableMethods[i]]() + "")) return true;
                }
            }
            return false;
        };
    },

    query: function () {
        return $("#search-input").val();
    },

    search: function () {
        const matcher = _.bind(this.makeMatcher(this.query()), this);
        const col = this.collection;
        if (col.pageableCollection) {
            col.pageableCollection.getFirstPage({silent: true});
        }
        col.reset(this.shadowCollection.filter(matcher), {reindex: false});
    },

    initialize: function (options) {
        this.options = options;
        this.$el.html(this.template);
        const collection = this.collection = this.collection.fullCollection || this.collection;
        const shadowCollection = this.shadowCollection = collection.clone();
        this.listenTo(collection, "add", (model, collection, options) => {
            shadowCollection.add(model, options);
        });
        this.listenTo(collection, "remove", (model, collection, options) => {
            shadowCollection.remove(model, options);
        });
        this.listenTo(collection, "sort", (col) => {
            if (!this.query()) shadowCollection.reset(col.models);
        });
        this.listenTo(collection, "reset", (col, options) => {
            options = _.extend({reindex: true}, options || {});
            if (options.reindex && options.from == null && options.to == null) {
                shadowCollection.reset(col.models);
            }
        });
    },

    render: function () {
        this.$el.html(this.template);
        return this;
    }
});

export default SearchView;