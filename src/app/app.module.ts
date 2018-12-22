import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobsService } from './jobs.service';
import { AddJobComponent } from './add-job/add-job.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    AddJobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [JobsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
