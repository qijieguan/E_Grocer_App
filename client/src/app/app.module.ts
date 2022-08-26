import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ItemService } from './item.service';
import { CartService } from './cart.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { NoteComponent } from './note/note.component';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';
import { ItemExpandComponent } from './item-expand/item-expand.component';
import { ReviewComponent } from './review/review.component';
import { RatingComponent } from './rating/rating.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    CartComponent,
    CustomizedCellComponent,
    NavBarComponent,
    NoteComponent,
    ItemExpandComponent,
    ReviewComponent,
    RatingComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CustomizedCellComponent]),
    MatIconModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'browse_groceries/:page', component: ItemListComponent},
      {path: 'browse_groceries/:page/:id', component: ItemExpandComponent},
      {path: 'shop_cart', component: CartComponent}, 
      {path: 'note', component: NoteComponent},
    ]),
    HttpClientModule,
  ],
  providers: [ItemService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
