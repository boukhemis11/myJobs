import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [];

  constructor(private jobService: JobsService) { }

  ngOnInit() {
    this.jobService.getAllJobs()
      .subscribe(data => this.jobs = data,
                  err => {
                  console.error(err);
                          });
    this.jobService.jobSubject.subscribe(data => {
      console.log(data);
      this.jobs = [data , ...this.jobs];
    });
  }
}

