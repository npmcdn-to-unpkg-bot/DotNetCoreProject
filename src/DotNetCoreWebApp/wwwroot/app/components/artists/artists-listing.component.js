"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var artists_service_1 = require("./artists.service");
var base_listing_component_1 = require('../../shared/base.listing.component');
var router_1 = require('angular2/router');
var pagination_component_1 = require('../../shared/pagination.component');
var ArtistsListingComponent = (function (_super) {
    __extends(ArtistsListingComponent, _super);
    function ArtistsListingComponent(_artistsService) {
        _super.call(this);
        this._artistsService = _artistsService;
    }
    ArtistsListingComponent.prototype.ngOnInit = function () {
        this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    };
    ArtistsListingComponent.prototype.pageData = function (pageNumber, pageSize, searchTerms, sortColumn, sortDirection) {
        var _this = this;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.searchTerms = (searchTerms == null ? '' : searchTerms);
        this.sortColumn = sortColumn;
        this.sortDirection = sortDirection;
        this._artistsService.getArtists(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection)
            .then(function (response) {
            _this.paginationData = response.paginationData;
            _this.initPagesArray();
            _this.artists = response.list;
        });
    };
    ArtistsListingComponent.prototype.onPageNumberChanged = function (newPageNumber) {
        this.pageNumber = newPageNumber;
        this.pageData(newPageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    };
    ArtistsListingComponent.prototype.clearSearch = function () {
        _super.prototype.clearSearch.call(this);
        this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
    };
    ArtistsListingComponent = __decorate([
        core_1.Component({
            templateUrl: "/app/components/artists/artists-listing.component.html",
            directives: [router_1.ROUTER_DIRECTIVES, pagination_component_1.PaginationComponent]
        }), 
        __metadata('design:paramtypes', [artists_service_1.ArtistsService])
    ], ArtistsListingComponent);
    return ArtistsListingComponent;
}(base_listing_component_1.BaseListingComponent));
exports.ArtistsListingComponent = ArtistsListingComponent;
