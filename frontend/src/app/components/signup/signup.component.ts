import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
  };

  public error = {
    email:null,
    name:null,
    password:null,
    password_confirmation:null,
  };

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router
  ) {}

  onSubmit() {
    return this.Jarwis.signup(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    if (this.Token.isValid()) {
      this.router.navigateByUrl('/profile');
    }
  }

  handleError(err) {
    this.error = err.error.errors;
  }

  ngOnInit(): void {}
}
