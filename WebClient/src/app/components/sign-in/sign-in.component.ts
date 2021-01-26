import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationResult, IdentityService} from "../../services/identity.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  error = "";

  constructor(
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
    if (this.form?.invalid) {
      return;
    }
    this.identityService.getToken(this.form?.value).subscribe((data: AuthenticationResult) => {
      if (data.error != null) {
        this.error = data.error;
      }
      else {
      }
    });
  }
}
