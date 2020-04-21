import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundTableComponent } from './round-table/round-table.component';
import { LoginComponent } from './login/login.component';
import { AssignmentComponent } from './assignment/assignment.component';


const routes: Routes = [  { path: 'table', component: RoundTableComponent },
{ path: '', component: AssignmentComponent },
{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
