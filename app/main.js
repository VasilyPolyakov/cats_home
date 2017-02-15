import App from "./routes/router.js";
import Backbone from "backbone";
import $ from "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/gallery.css";
import "./assets/css/gallery-item.css";

$(() => {
    new App();
    Backbone.history.start();
});