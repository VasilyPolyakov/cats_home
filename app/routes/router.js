import {Router} from "backbone";
import CatsView from "../views/cats/cats_view.js";
import CatView from "../views/cat/cat_view.js";
import Cats from "../collections/Cats.js";
import Cat from "../models/Cat.js";
const AppRouter = Backbone.Router.extend({
    routes: {
        "cats": "catsGallery",
        "cats/:id": "singleCat",
        "*path": "defaultRouter"
    },

    catsGallery: function () {
        new CatsView({model: Cat, collection: Cats});
    },

    defaultRouter: function () {
        this.navigate("cats", {trigger: true});
    },

    singleCat: function (id) {
        new CatView({model: new Cat({id: id})});
    }
});

export default AppRouter;