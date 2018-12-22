import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobsService } from './jobs.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [JobsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
