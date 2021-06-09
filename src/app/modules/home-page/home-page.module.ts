import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomePageRoutingModule } from './home-page.routing';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryComponent } from './components/category/category.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { CreatePostModalComponent } from './components/create-post/create-post-modal/create-post-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressModalComponent } from './components/address-modal/address-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownFormComponent } from './components/dropdown-form/dropdown-form.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    // tslint:disable-next-line: max-line-length
    declarations: [
        HomeComponent,
        CategoryComponent,
        ListItemsComponent,
        CreatePostComponent,
        CreatePostModalComponent,
        AddressModalComponent,
        DropdownFormComponent,
    ],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        MatIconModule,
        FontAwesomeModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        SharedModule,
        InfiniteScrollModule,
        MatCarouselModule.forRoot(),
    ],
    exports: [AddressModalComponent, ListItemsComponent],
})
export class HomePageModule {}
