function Search(opts) {
    this.currentPage = -1;
    this.pageCount = 0;
    this.pages = [];
    this.pageLimit = 8;
    this.data = [];
    for (var i in opts)
        this[i] = opts[i];
    return this;
}
Search.prototype.initiate = function () {
    this.getPageData(1);
    return this;
};
Search.prototype.createPageRange = function () {
    this.pages.splice(0);
    for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
    }
};
Search.prototype.previousPage = function () {
    this.setPage(Math.max(0, this.currentPage - 1));
};
Search.prototype.nextPage = function () {
    this.setPage(Math.min(this.pageCount, this.currentPage + 1));
};
Search.prototype.pagePrompt = function () {
    var page = prompt("Type page number", this.currentPage);
    if (page) this.setPage(page * 1);
};
Search.prototype.setPage = function (page) {
    this.getPageData(page);
};
Search.prototype.isInRange = function (page) {
    var diff = Math.max(0, this.pageLimit / 2 - this.currentPage);
    var diff1 = Math.max(0, this.pageLimit / 2 + this.currentPage - this.pageCount - 1);
    return (Math.abs(page - this.currentPage) < this.pageLimit / 2 + diff + diff1);
};
Search.prototype.isLastPage = function () {
    return this.currentPage == this.pageCount;
};
Search.prototype.isFirstPage = function () {
    return this.currentPage == 1;
};
Search.prototype.isCurrentPage = function (page) {
    return page == this.currentPage;
};
Search.prototype.shouldShowJumpPage = function () {
    return !(this.isInRange(1) && this.isInRange(this.pageCount));
};
Search.prototype.setLastPage = function () {
    this.setPage(this.pageCount);
};
Search.prototype.range = function () {
    return this.pages;
};Search
Search.prototype.searchGetData = function () {
    var request = {
        method: 'GET',
        url: this.RequestData.baseUrl + "/" + this.dataSearchUrl + this.searchData,
        headers: this.RequestData.headers
    };
    console.log(request);
    this.http(request).then(
        function (response) {
            this.data = response.data[this.dataClass];
            //this.data = response.data[this.dataClass].concat(JSON.parse(angular.toJson(response.data[this.dataClass]))).concat(JSON.parse(angular.toJson(response.data[this.dataClass])));
            this.pageCount = response.data.page_count;
            this.createPageRange();
            console.log(response.data);
        }.bind(this),
        function (response) {
            console.log(response.data);
        }.bind(this)
    );
};


