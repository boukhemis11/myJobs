import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobs = [];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
  }

  searchJobs(searchData) {
    console.log(searchData);
    this.jobService.searchJob(searchData).subscribe(
      data => this.jobs = data
    );
  }
}
