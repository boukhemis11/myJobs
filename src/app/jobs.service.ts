import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  initialJobs = [];
  jobs = [];
  jobSubject = new Subject();

  constructor(private http: Http) {}

  getAllJobs() {
    if (this.jobs.length > 0 && this.initialJobs.length > 0) {
       console.log('case if ', this.jobs);
    return of([...this.jobs, ...this.initialJobs]);
    } else if (this.jobs.length > 0 && this.initialJobs.length === 0) {
    console.log('case else if');
    return this.http.get('data/jobs.json')
        .pipe(map(res => res.json()))
        .pipe(tap(data => {
          this.initialJobs = data;
          this.jobs = [...this.jobs, ...this.initialJobs];
        }));
    } else {
    console.log('case else');
    return this.http.get('data/jobs.json')
            .pipe(map(res => res.json()))
            .pipe(tap(data => this.initialJobs = data));
    }
  }

  addJob(jobData) {
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs];
    return this.jobSubject.next(jobData);
  }
}

