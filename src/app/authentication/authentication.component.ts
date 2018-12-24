import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  jobData = null;
  isAutentication = false;
  welcomeMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
        this.refrechFlag();
    }
  }

  refrechFlag() {
    this.isAutentication = true;
    this.welcomeMessage = 'Bienvenue';
  }

  login(credentials) {
    this.authService.login(credentials).subscribe(
                      data => {
                        this.handleLoginSuccess(data);
                      },
                      error => {
                        this.handleLoginFailure(error);
                      }
                    );
  }

  handleLoginSuccess(data) {
    console.log('success: ', data);
    this.jobData = data;
    this.refrechFlag();
    localStorage.setItem('job-data', JSON.stringify(data));
  }

  handleLoginFailure(error) {
    console.error('failure: ', error);
  }

}
