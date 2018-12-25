import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  BASE_URL = 'http://localhost:4444/auth';
  info = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(formData) {
    console.log(formData);
      return this.authService.register(formData)
              .subscribe(
                data => this.registerSuccess(data),
                error => this.registerFilure(error)
              );
  }

  registerSuccess(data) {
    this.info = data;
    // localStorage.setItem('job-data', JSON.stringify(data));
    this.router.navigate(['/login']);
  }

  registerFilure(error) {
    console.log(error);
  }

}
