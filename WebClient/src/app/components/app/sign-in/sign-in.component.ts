import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {TokenService} from "../../../services/token.service";
import {IdentityService} from "../../../services/identity.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  error = "";
  public isSaved = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private formBuilder: FormBuilder,
    private identityService: IdentityService) {
    this.form = this.formBuilder.group({
      login: [
        "",
        [
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.error = "";
    if (this.form?.invalid) {
      return;
    }
    this.identityService.getToken(this.form?.value).subscribe(
    (data: any) => {
      console.log(data.token);
      localStorage.setItem("token", data.token);
      this.tokenService.currentTokenSubject.next(data.token);
      this.router.navigate(['/']);
    },
    (data: any) => {
      this.error = data.error.message;
    });
  }
}
