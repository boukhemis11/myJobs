import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  jobs = [];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.jobSearchSubject.subscribe(
      data => this.jobsSearch(data)
    );
    console.log(this.jobs);
  }
  jobsSearch(data) {
    this.jobs = data.jobs;
  }

}
