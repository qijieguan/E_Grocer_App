import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomizedCellComponent } from '../customized-cell/customized-cell.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  rowData: any[] = [];
  subtotal: number = 0;
  map_api_key: string = "AIzaSyAB5KWxkElCuvl0cOF3yMxBdRJkwvhCIz8";

  constructor(private cart_service: CartService) {
  }

  ngOnInit(): void {
    this.cart_service.getCart().subscribe((cart_data) => {
      if (cart_data) { 
        this.rowData = cart_data;
        this.rowData.forEach(item => { this.subtotal += item.price; });
      }
    });
  }

  gridApi: any;
  
  onGridReady(params: any) { 
    this.gridApi = params.api; 
    this.gridApi.setRowData(this.rowData);
  }

  defaultColDef = { sortable: true, filter: true, autoHeight: true, resizable: true, wrapText: true, }

  colDefs = [
    { headerName: '', field: 'url', width: 150,
      cellRenderer: (params: any) => 
      `<img style="height: 4rem; width: 4rem; border-radius: 2rem; margin: 0.5rem; border: 1px solid grey;"  
      src=${params.data.url} alt="" />`,
    },
    { headerName: 'Product', field: 'name', minWidth: 100, maxWidth: 150,
      cellRenderer: CustomizedCellComponent,
      cellRendererParams: { context: 'cell-name' }
    },
    { headerName: 'Quantity', field: 'quantity', width: 150, 
      cellRenderer: CustomizedCellComponent,
      cellRendererParams: { context: 'cell-quantity' }
    },
    { headerName: 'Price', field: 'price', width: 125,
      cellRenderer: (params: any) => `<div style=" font-weight: 500;">$${params.data.price.toFixed(2)}</div>`
    },
    { headerName: 'Action', field: 'action', width: 125,
      cellRenderer: CustomizedCellComponent,
      cellRendererParams: {
        context: 'cell-delete'
      }
    }
  ]

  ngOnDestroy(): void { this.gridApi.destroy(); ; }
  
}
