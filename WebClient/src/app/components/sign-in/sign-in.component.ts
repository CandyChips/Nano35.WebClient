import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService} from "../../services/identity.service";

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
    this.error = "";
    if (this.form?.invalid) {
      return;
    }
    this.identityService.getToken(this.form?.value).subscribe(
    (data: any) => {
      console.log(data.token);
    },
    (data: any) => {
      this.error = data.error.message;
    });
  }
}
