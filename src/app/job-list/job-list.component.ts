import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { error } from 'util';


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
                    }
                    );
  }

}
