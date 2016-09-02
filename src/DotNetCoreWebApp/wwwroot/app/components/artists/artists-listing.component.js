System.register(["angular2/core", "./artists.service", 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, artists_service_1, router_1;
    var ArtistsListingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ArtistsListingComponent = (function () {
                function ArtistsListingComponent(_artistsService) {
                    this._artistsService = _artistsService;
                    this.pageNumber = 1;
                    this.pageSize = 10;
                    this.searchTerms = '';
                    this.sortColumn = 'Name';
                    this.sortDirection = 'ASC';
                    this.isLoading = true;
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
                ArtistsListingComponent.prototype.initPagesArray = function () {
                    if (!this.paginationData)
                        return;
                    this.pagesArray = [];
                    for (var i = 1; i <= this.paginationData.totalNumberOfPages; i++) {
                        this.pagesArray.push(i);
                    }
                };
                ArtistsListingComponent.prototype.clearSearch = function () {
                    this.searchTerms = '';
                    this.pageData(this.pageNumber, this.pageSize, this.searchTerms, this.sortColumn, this.sortDirection);
                };
                ArtistsListingComponent = __decorate([
                    core_1.Component({
                        templateUrl: "/app/components/artists/artists-listing.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistsService])
                ], ArtistsListingComponent);
                return ArtistsListingComponent;
            }());
            exports_1("ArtistsListingComponent", ArtistsListingComponent);
        }
    }
});
//# sourceMappingURL=artists-listing.component.js.map