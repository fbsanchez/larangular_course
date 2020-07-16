import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss'],
})
export class ResponseResetComponent implements OnInit {
  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null,
  };

  public error = {
    email: null,
    password: null,
    message: null,
  };

  constructor(
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private router: Router,
    private notify: SnotifyService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.form.resetToken = params['token'];
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.error = {
      email: null,
      password: null,
      message: null,
    };
    this.Jarwis.changePassword(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.notify.info(data);
    this.router.navigateByUrl('/login');
  }

  handleError(err) {
    if (err.error.errors) this.error = err.error.errors;
    else this.error.message = err.error.error;
  }
}
