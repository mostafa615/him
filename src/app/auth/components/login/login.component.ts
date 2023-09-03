import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import { Cache } from '../../../shared/cache';
import { Message } from '../../../shared/message';
import { AppModule } from '../../../app.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public userAuth: any = {};

  public doc: any = AppModule.doc;
  env: any = environment;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public isSubmitted = false;

  ngOnInit() {
    this.doc.jquery('body').addClass('login-background');
    this.route.queryParams.subscribe((params) => {
      // noinspection TsLint
    });
  }

  login() {
    this.isSubmitted = true;

    this.authService.login(this.userAuth).subscribe((result) => {
        const data: any = result;

        if (data.status == 1) {
          // cache user
          Cache.set(AuthService.USER_PRFIX, data.data);

          // cache api token
          Cache.set(AuthService.API_TOKEN_PRFIX, data.data.api_token);
          this.router.navigate(['/']).then().catch();

          window.location.href = "/";
        } else {
          Message.error(data.message);
        }

        this.isSubmitted = false;
      },
      (e) => {
        Message.error(e);
        this.isSubmitted = false;
      }
    );
  }
}
