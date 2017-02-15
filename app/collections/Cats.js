import {PageableCollection} from "backbone.paginator";
import Cat from "../models/Cat";

const Cats = Backbone.PageableCollection.extend({
    model: Cat,
    url: "api/cats.json",
    mode: "client"
});

export default new Cats();