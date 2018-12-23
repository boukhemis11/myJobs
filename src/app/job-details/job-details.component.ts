import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

jobDetail = null;

  constructor(private jobService: JobsService, private activetedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activetedRoute.snapshot.params.id;

    this.jobService.getJob(id).subscribe(
      data => {
        this.jobDetail = data;
      }

    );
  }

}
