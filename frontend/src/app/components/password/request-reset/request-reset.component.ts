import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss'],
})
export class RequestResetComponent implements OnInit {
  public error = null;
  public form = {
    email: null,
  };

  constructor(
    private Jarwis: JarwisService,
    private notify: SnotifyService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.notify.info('Sending movida'));
    this.Jarwis.sendPasswordResetLink(this.form).subscribe(
      (data) => console.log(data),
      (error) => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.form.email = null;
  }
}
