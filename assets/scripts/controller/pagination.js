function Pagination(opts) {
    //this.currentSearch = null;
    this.currentPage = -1;
    this.pageCount = 0;
    this.pages = [];
    this.pageLimit = 8;
    this.data = [];
    this.oldData = "";
    for (var i in opts)
        this[i] = opts[i];
    return this;
}
Pagination.prototype.initiate = function () {
    this.getPageData(1);
    return this;
};
Pagination.prototype.createPageRange = function () {
    this.pages.splice(0);
    for (var i = 1; i <= this.pageCount; i++) {
        this.pages.push(i);
    }
};
Pagination.prototype.previousPage = function () {
    this.setPage(Math.max(0, this.currentPage - 1));
};
Pagination.prototype.nextPage = function () {
    this.setPage(Math.min(this.pageCount, this.currentPage + 1));
};
Pagination.prototype.pagePrompt = function () {
    var page = prompt("Type page number", this.currentPage);
    if (page) this.setPage(page * 1);
};
Pagination.prototype.setPage = function (page) {
    this.getPageData(page);
};
Pagination.prototype.isInRange = function (page) {
    var diff = Math.max(0, this.pageLimit / 2 - this.currentPage);
    var diff1 = Math.max(0, this.pageLimit / 2 + this.currentPage - this.pageCount - 1);
    return (Math.abs(page - this.currentPage) < this.pageLimit / 2 + diff + diff1);
};
Pagination.prototype.isLastPage = function () {
    return this.currentPage == this.pageCount;
};
Pagination.prototype.isFirstPage = function () {
    return this.currentPage == 1;
};
Pagination.prototype.isCurrentPage = function (page) {
    return page == this.currentPage;
};
Pagination.prototype.shouldShowJumpPage = function () {
    return !(this.isInRange(1) && this.isInRange(this.pageCount));
};
Pagination.prototype.setLastPage = function () {
    this.setPage(this.pageCount);
};
Pagination.prototype.range = function () {
    return this.pages;
};
Pagination.prototype.search = function () {
    if (this.oldData === this.searchData) {
        return;
    }
    else{
        return this.getPageData();
    }
};
Pagination.prototype.getPageData = function (page) {
    if (page === this.currentPage) {
        return;
    }
    else if (page) {
        this.currentPage = page;
    }
    else {
        this.currentPage = 1;
    }
    if (!this.searchData || (this.searchData && this.searchData.length === 0)) {
        var request = {
            method: 'GET',
            url: this.RequestData.baseUrl + this.dataClassUrl + this.currentPage,
            headers: this.RequestData.headers
        };
    }
    else {
        console.log(this.currentPage);
        var request = {
            method: 'GET',
            url: this.RequestData.baseUrl + this.dataSearchUrl + this.searchData + this.pageFilter + this.currentPage,
            headers: this.RequestData.headers
        };
    }
    console.log(request);
    this.http(request).then(
        function (response) {
            this.data = response.data[this.dataClass];
            //this.root = response.data;
            //this.data = response.data[this.dataClass].concat(JSON.parse(angular.toJson(response.data[this.dataClass]))).concat(JSON.parse(angular.toJson(response.data[this.dataClass])));
            //this.popup.success('Successfull!', 'Account has been found');
            this.oldData = this.searchData;
            this.pageCount = response.data.page_count;
            this.createPageRange();
            console.log(response.data);
        }.bind(this),
        function (response) {
            this.popup.error('Error!', 'Account has not been found');
            console.log(response.data);
        }.bind(this)
    );
};



