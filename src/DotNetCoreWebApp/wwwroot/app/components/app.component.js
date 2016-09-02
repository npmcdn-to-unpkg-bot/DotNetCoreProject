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
var core_2 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/Rx'); // Load all features
var router_1 = require('angular2/router');
var artists_listing_component_1 = require('./artists/artists-listing.component');
var artists_service_1 = require("./artists/artists.service");
var artist_edit_component_1 = require('./artists/artist-edit.component');
var welcome_component_1 = require('./home/welcome.component');
var contact_page_component_1 = require('./home/contact-page.component');
core_2.enableProdMode();
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = 'My  Application';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: '/app/components/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [artists_service_1.ArtistsService,
                http_1.HTTP_PROVIDERS,
                router_1.ROUTER_PROVIDERS]
        }),
        router_1.RouteConfig([
            { path: '/home', name: 'Home', component: welcome_component_1.WelcomeComponent, useAsDefault: true },
            { path: '/artists-list', name: 'ArtiststList', component: artists_listing_component_1.ArtistsListingComponent },
            { path: '/artist-edit/:id', name: 'ArtistEdit', component: artist_edit_component_1.ArtistEditComponent },
            { path: '/contact', name: 'ContactPage', component: contact_page_component_1.ContactPageComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
