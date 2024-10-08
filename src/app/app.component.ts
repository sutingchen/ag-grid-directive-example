import { Component, TemplateRef, ViewChild } from '@angular/core';
import { books } from './books';
import { ReusableGridTemplateComponent } from './reusable-grid-template/reusable-grid-template.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('authorList', { static: true }) authorList: TemplateRef<any>;
  @ViewChild('booksList', { static: true }) booksList: TemplateRef<any>;

  public rowData = [];
  public gridApi: any;
  public columnDefs = [];
  public selectedBooks: string[] = [];

  public defaultColDef = {
    autoHeight: true,
    resizable: true,
  };

  ngOnInit() {
    this.rowData = books.books;
    this.columnDefs = [
      {
        headerName: 'Book Type',
        field: 'type',
      },
      {
        headerName: 'Authors',
        cellRendererFramework: ReusableGridTemplateComponent,
        cellRendererParams: {
          ngTemplate: this.authorList,
        },
      },
      {
        headerName: 'Books',
        cellRendererFramework: ReusableGridTemplateComponent,
        cellRendererParams: {
          ngTemplate: this.booksList,
        },
      },
    ];
  }

  showBook(author) {
    this.selectedBooks = author.books;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  dataRendered(params) {
    params.api.sizeColumnsToFit();
  }
}
