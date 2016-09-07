
import {Component, OnChanges, Input, 
         Output, EventEmitter } from 'angular2/core';

@Component({
    selector: 'pagination-controls',
    templateUrl: "app/shared/pagination.component.html"

})
export class PaginationComponent implements OnChanges {
    /*
    maxNavigationPagesToDisplay: number = 8;
    pageNumber: number;
    lastPage: number;
    countInitialValue: number;
    rightPageCount: number;
    pagesToAdd: number;
    previousPage: number = (this.pageNumber - 1);
    searchTerms: string = '';
    sortCol = '';
    sortDir = 'ASC';
    totalNumberOfItems:number;
    */
    @Input() totalNumberOfPages:number;

    ngOnChanges(): void {

    }

}