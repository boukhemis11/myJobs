import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: Http) {}

  getAllJobs() {
    return this.http.get('data/jobs.json')
      .pipe(map(res => res.json()));
  }
}

