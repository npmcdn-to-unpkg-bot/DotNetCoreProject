
import {Component, OnChanges, Input,
    Output, EventEmitter, OnInit } from 'angular2/core';

@Component({
    selector: 'pagination-controls',
    templateUrl: "app/shared/pagination.component.html",
    styleUrls: ["app/shared/pagination.component.css"]

})
export class PaginationComponent implements OnChanges, OnInit {    

    maxNavigationPagesToDisplay: number = 8;

    lastPage: number;
    countInitialValue: number;
    rightPageCount: number;
    pagesToAdd: number;
    previousPage: number = (this.pageNumber > 2 ? (this.pageNumber - 1) : 1);
    
    sortCol = '';
    sortDir = 'ASC';   

    pagesArray: number[];

    @Input() pageNumber: number;
    @Input() totalNumberOfRecords: number;
    @Input() totalNumberOfPages: number;
    @Input() offsetFromZero: number;
    @Input() offsetUpperBound: number;
    @Input() searchTerms: string = '';

    showPaginationControls:boolean = false;

    ngOnInit(): void {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
    }

    ngOnChanges(): void {
        this.showPaginationControls = (this.totalNumberOfPages > 1);
        this.initPagesArray();
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
        this.pageNumberClicked.emit(this.pageNumber );
    }

}