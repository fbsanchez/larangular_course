import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };

  public error = null;

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  onSubmit() {
    return this.Jarwis.login(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    if (this.Token.isValid()) {
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('/profile');
    }

  }

  handleError(err) {
    this.error = err.error.error;
  }

  ngOnInit(): void {}
}
