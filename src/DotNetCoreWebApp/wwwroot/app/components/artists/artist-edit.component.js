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
var router_1 = require('angular2/router');
var artists_service_1 = require("./artists.service");
var ArtistEditComponent = (function () {
    function ArtistEditComponent(_routeParams, _router, _artistsService) {
        this._routeParams = _routeParams;
        this._router = _router;
        this._artistsService = _artistsService;
        this.pageTitle = 'Edit artist with ID ';
        this.artistId = +this._routeParams.get('id');
    }
    ArtistEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._artistsService.getArtistById(this.artistId)
            .then(function (response) {
            _this.artist = response;
            _this.pageTitle += " " + _this.artist.name;
        });
    };
    ArtistEditComponent.prototype.cancel = function () {
        this._router.navigate(['ArtiststList']);
    };
    ArtistEditComponent = __decorate([
        core_1.Component({
            templateUrl: '/app/components/artists/artist-edit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.RouteParams, router_1.Router, artists_service_1.ArtistsService])
    ], ArtistEditComponent);
    return ArtistEditComponent;
}());
exports.ArtistEditComponent = ArtistEditComponent;
