import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobs = [];
  jobSubject = new Subject();

  constructor(private http: Http) {}

  getAllJobs() {
    return this.http.get('data/jobs.json')
      .pipe(map(res => res.json()));
  }

  addJob(jobData) {
    jobData.id = Date.now();
    return this.jobSubject.next(jobData);
  }
}

