import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'jobs/add', component: AddJobComponent},
  {path: 'jobs/:id', component: JobDetailsComponent},
  {path: 'jobs', component: JobListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'register', component: AuthenticationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
