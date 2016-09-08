
import {Component, OnChanges, Input,
    Output, EventEmitter, OnInit } from 'angular2/core';

@Component({
    selector: 'pagination-controls',
    templateUrl: "app/shared/pagination.component.html",
    styleUrls: ["app/shared/pagination.component.css"]

})
export class PaginationComponent implements OnChanges, OnInit {

    numberOfPagesToDisplayOnEitherSideOfCurrentPage: number = 6;

    previousPage: number = (this.pageNumber > 2 ? (this.pageNumber - 1) : 1);

    sortCol = '';
    sortDir = 'ASC';

    minPageToDisplay: number = 1;
    maxPageToDisplay: number = 1;

    pagesArray: number[];
    pagesLeftOfCurrentPageArray = [];
    pagesRightOfCurrentPageArray = [];

    @Input() pageNumber: number;
    @Input() pageSize: number;
    @Input() totalNumberOfRecords: number;
    @Input() totalNumberOfPages: number;
    @Input() offsetFromZero: number;
    @Input() offsetUpperBound: number;
    @Input() searchTerms: string = '';

    showPaginationControls: boolean = false;

    calculateMinMaxPagesToDisplay(): void {
        this.calculateMinPageToDisplay();
        this.calculateMaxPageToDisplay();
    }

    calculateMinPageToDisplay(): void {
        let min: number = this.pageNumber - this.numberOfPagesToDisplayOnEitherSideOfCurrentPage;
        if(min <= 0) { min = 1; }
        this.pagesLeftOfCurrentPageArray = [];
        for (var i = min; i < this.pageNumber; i++) {
            this.pagesLeftOfCurrentPageArray.push(i);
        }

    }    

    calculateMaxPageToDisplay(): void {
        let max: number = this.pageNumber + this.numberOfPagesToDisplayOnEitherSideOfCurrentPage;
        if(max > this.totalNumberOfPages) {
            max = this.totalNumberOfPages;
        }
        this.pagesRightOfCurrentPageArray = [];
        for (var i = (this.pageNumber+1); i <= max; i++) {
            this.pagesRightOfCurrentPageArray.push(i);
        }
    }



    ngOnInit(): void {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
        this.calculateMinMaxPagesToDisplay();
    }

    ngOnChanges(): void {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
        this.calculateMinMaxPagesToDisplay();
    }

    private initPagesArray(): void {
        if (!this.showPaginationControls) return;
        this.pagesArray = [];
        for (var i = 1; i <= this.totalNumberOfPages; i++) {
            this.pagesArray.push(i);
        }
    }

    @Output() pageNumberClicked: EventEmitter<number> = new EventEmitter<number>();

    onPageClick(newPageNumber: number): void {
        this.pageNumber = newPageNumber;
        this.pageNumberClicked.emit(this.pageNumber);
    }

}