import {Model} from "backbone";

const Cat = Backbone.Model.extend({
    url: function () {
        return `api/cats/${this.id}.json`;
    },

    defaults: function () {
        return {
            id: 0,
            name: "",
            birthday: new Date(),
            gender: 0,
            breed: "",
            photos: [],
            description: "Very good cat.",
            price: 0,
            vaccinated: true
        };
    },

    getAgeString: function () {
        let date = new Date(this.get("birthday") * 1000);
        let ageDifMs = Date.now() - date.getTime();
        let ageDate = new Date(ageDifMs);
        let yearsCount = Math.abs(ageDate.getUTCFullYear() - 1970);
        return yearsCount > 1 ? yearsCount + " years" : `${yearsCount} year`;
    },

    getGender: function () {
        return this.get("gender") ? "male" : "female";
    },

    getPrice: function () {
        return this.get("price") + "$";
    }
});

export default Cat;