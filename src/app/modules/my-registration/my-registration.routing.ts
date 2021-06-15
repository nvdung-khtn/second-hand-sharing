import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRegistrationComponent } from './pages/my-registration/my-registration.component';

const routes: Routes = [{ path: '', component: MyRegistrationComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyRegistrationRouting {}
