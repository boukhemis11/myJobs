import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  initialJobs = [];
  jobs = [];
  jobSubject = new Subject();
  jobSearchSubject = new Subject();
  BASE_URL = 'http://localhost:4444/';

  constructor(private http: Http, private authService: AuthService) {}

  getAllJobs() {
    return this.http.get(this.BASE_URL + 'api/jobs')
            .pipe(map(res => res.json()));
  }

  getJob(id) {
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
            .pipe(map(res => res.json()));
  }

  addJob(jobData, token) {
    jobData.id = Date.now();
    const requestOptions = this.authService.addAuthorizationHeader(token);
    return this.http.post(this.BASE_URL + 'api/jobs', jobData, requestOptions)
          .pipe(map(res => {
            this.jobSubject.next(jobData);
        }));
  }

  searchJob(criteria) {
    return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`)
      .pipe(map(res => res.json()))
      .pipe(tap(res => {
        this.jobSearchSubject.next(res);
      }));
  }
}

