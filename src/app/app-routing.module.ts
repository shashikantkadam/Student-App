import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './shared/components/add-student/add-student.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthgaurdService } from './shared/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component:DashboardComponent, canActivate:[AuthgaurdService] },
  { path: 'addstudent', component: AddStudentComponent, canActivate:[AuthgaurdService] },
  { path: 'addstudent/:id', component: AddStudentComponent, canActivate:[AuthgaurdService] },
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
