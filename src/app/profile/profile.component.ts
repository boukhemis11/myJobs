import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  decodedToken = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
      const job_token = localStorage.getItem('job-data');
      console.log(job_token);
      this.decodedToken = this.authService.decodeToken(job_token);
      console.log(this.decodedToken);
    }
  }

}
