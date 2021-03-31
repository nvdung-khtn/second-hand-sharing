import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomePageRoutingModule } from './home-page.routing';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryComponent } from './components/category/category.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { CreatePostComponent } from './components/create-post/create-post.component';


@NgModule({
  declarations: [HomeComponent, CategoryComponent, ListItemsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatIconModule,
    FontAwesomeModule,
  ]
})
export class HomePageModule { }
