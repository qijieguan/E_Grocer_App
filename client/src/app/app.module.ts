import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import {MatIconModule} from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { ItemService } from './item.service';
import { CartService } from './cart.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CustomizedCellComponent } from './customized-cell/customized-cell.component';
import { ItemExpandComponent } from './item-expand/item-expand.component';
import { ReviewComponent } from './review/review.component';
import { RatingComponent } from './rating/rating.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MapComponent } from './map/map.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { MainInterfaceComponent } from './main-interface/main-interface.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { SubmissionFormComponent } from './submission-form/submission-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    CartComponent,
    CustomizedCellComponent,
    NavBarComponent,
    FeedbackComponent,
    ItemExpandComponent,
    ReviewComponent,
    RatingComponent,
    FooterComponent,
    SearchComponent,
    PaginationComponent,
    CheckoutComponent,
    MapComponent,
    PopUpComponent,
    MainInterfaceComponent,
    EditFormComponent,
    UserPortalComponent,
    SubmissionFormComponent,
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CustomizedCellComponent]),
    MatIconModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'browse_products/:page?:mode', component: ItemListComponent},
      {path: 'browse_products/:page/view/:id', component: ItemExpandComponent},
      {path: 'main', component: MainInterfaceComponent},
      {path: 'main/user_portal', component: UserPortalComponent},
      {path: 'main/product_submission', component: SubmissionFormComponent},
      {path: 'checkout', component: CheckoutComponent}, 
      {path: 'feedback', component: FeedbackComponent},
    ]),
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [ItemService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
