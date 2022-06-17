import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';

import { ItemService } from './item.service';
import { CartService } from './cart.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { NoteComponent } from './note/note.component';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    CartComponent,
    CustomizedCellComponent,
    NavBarComponent,
    NoteComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CustomizedCellComponent]),
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'item_list', component: ItemListComponent},
      {path: 'shop_cart', component: CartComponent}, 
      {path: 'note', component: NoteComponent},
  ]),
  ],
  providers: [ItemService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
