import {View} from "backbone";
import paginationTemplate from "./pagination_template.html";
const Pagination_View = View.extend({
    el: "#pagination",
    template: paginationTemplate,
    events: {
        "click .pagination-link": "getPage"
    },

    update: function () {
        return this.render(this.createPaginationOptions(this.collection.state.currentPage));
    },

    render: function (options) {
        this.$el.html(this.template({options: options}));
        return this;
    },

    getPage: function (event) {
        const pageNumber = parseInt($(event.target).data("number-of-page"));
        this.collection.getPage(pageNumber);
        this.render(this.createPaginationOptions(pageNumber));
    },

    createPaginationOptions: function (currentPage) {
        let pageInPaginationBlock = 5;
        const options = {
            currentPage: currentPage
        };
        if (this.collection.state.totalPages < pageInPaginationBlock) {
            options.lastPage = this.collection.state.lastPage;
            options.firstPage = 1;
            options.totalPages = this.collection.state.totalPages;
        } else {
            if (this.isPageInStartOfPaginationBlock(currentPage, this.collection)) {
                options.lastPage = this.getLastPageNumberInStartBlock(currentPage, this.collection);
            } else if (this.isPageInMiddleOfEndPaginationBlock(currentPage, this.collection)) {
                options.lastPage = currentPage + 2;
            } else {
                options.lastPage = this.collection.state.totalPages;
            }
            if (this.isPageInEndOfPaginationBlock(currentPage, this.collection)) {
                options.firstPage = this.getFirstPageNumberInEndBlock(currentPage, this.collection);
            } else if (this.isPageInMiddleOfStartPaginationBlock(currentPage, this.collection)) {
                options.firstPage = currentPage - 2;
            } else {
                options.firstPage = this.collection.state.firstPage;
            }
            options.totalPages = options.lastPage - options.firstPage + 1;
        }
        return options;
    },

    isPageInStartOfPaginationBlock: function (currentPageNumber) {
        return currentPageNumber - this.collection.state.firstPage < 2;
    },

    isPageInMiddleOfEndPaginationBlock: function (currentPageNumber) {
        return this.collection.state.totalPages > currentPageNumber + 2;
    },

    isPageInMiddleOfStartPaginationBlock: function (currentPageNumber) {
        return this.collection.state.firstPage < currentPageNumber - 2;
    },

    isPageInEndOfPaginationBlock: function (currentPageNumber) {
        return this.collection.state.lastPage - currentPageNumber < 2;
    },

    getLastPageNumberInStartBlock: function (currentPageNumber) {
        const numberOfPageBeforeCurrent = currentPageNumber - this.collection.state.firstPage;
        return currentPageNumber - numberOfPageBeforeCurrent + 4;
    },

    getFirstPageNumberInEndBlock: function (currentPageNumber) {
        const numberOfPagesAfterCurrent = this.collection.state.lastPage - currentPageNumber;
        return currentPageNumber + numberOfPagesAfterCurrent - 4;
    }
});

export default Pagination_View;
