"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.maxNavigationPagesToDisplay = 8;
        this.previousPage = (this.pageNumber > 2 ? (this.pageNumber - 1) : 1);
        this.sortCol = '';
        this.sortDir = 'ASC';
        this.searchTerms = '';
        this.showPaginationControls = false;
        this.pageNumberClicked = new core_1.EventEmitter();
    }
    PaginationComponent.prototype.ngOnInit = function () {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
    };
    PaginationComponent.prototype.ngOnChanges = function () {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
    };
    PaginationComponent.prototype.initPagesArray = function () {
        if (!this.showPaginationControls)
            return;
        this.pagesArray = [];
        for (var i = 1; i <= this.totalNumberOfPages; i++) {
            this.pagesArray.push(i);
        }
    };
    PaginationComponent.prototype.onPageClick = function (newPageNumber) {
        this.pageNumber = newPageNumber;
        this.pageNumberClicked.emit(this.pageNumber);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "pageNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalNumberOfRecords", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalNumberOfPages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "offsetFromZero", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "offsetUpperBound", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PaginationComponent.prototype, "searchTerms", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageNumberClicked", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'pagination-controls',
            templateUrl: "app/shared/pagination.component.html",
            styleUrls: ["app/shared/pagination.component.css"]
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
