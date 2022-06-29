import { Component, OnInit, OnDestroy, APP_ID } from '@angular/core';
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
  tax: number = 0.1;

  constructor(private cart_service: CartService) {
    this.cart_service.getCartItem().subscribe((cart_data) => { 
      this.subtotal = 0;
      this.tax = 0.1;
      
      this.rowData = cart_data;
      this.rowData.forEach(item => { this.subtotal += item.price; });

      this.tax *= this.subtotal; 
    });
  }

  ngOnInit(): void {
  }

  gridApi: any;
  
  onGridReady(params: any) { 
    this.gridApi = params.api; 
    this.gridApi.setRowData(this.rowData);
  }

  defaultColDef = { sortable: true, filter: true, autoHeight: true, resizable: true, }

  colDefs = [
    { headerName: '', field: 'url', 
      cellRenderer: (params: any) => 
      `<img style="height: 4rem; width: 4rem; border-radius: 2rem; margin: 0.5rem 0"  src=${params.data.url} alt="" />`
    },
    { headerName: 'Product', field: 'name',
     cellRenderer: (params: any) => `<div style="font-weight: 400">${params.data.name}</div>`},
    { headerName: 'Quantity', field: 'quantity',
      cellRenderer: CustomizedCellComponent,
      cellRendererParams: { context: 'cell-quantity' }
    },
    { headerName: 'Price', field: 'price',
      cellRenderer: (params: any) => `<div style="font-weight: 400">${params.data.price.toFixed(2)}</div>`
    },
    { headerName: 'Action', field: 'action',
      cellRenderer: CustomizedCellComponent,
      cellRendererParams: {
        context: 'cell-delete'
      }
    }
  ]

  ngOnDestroy(): void { this.gridApi.destroy(); }
  
}
