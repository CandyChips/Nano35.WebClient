import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from 'src/app/services/identity.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  form!: FormGroup;
  error = "";
  loading = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private identityService: IdentityService) {
    this.form = this.formBuilder.group({
      phone: [
        "",
        [
          Validators.required
        ]
      ],
      email: [
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
      ],
      passwordConfirm: [
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
    this.identityService.getToken(this.form?.value).subscribe(
      (data: any) => {
        console.log(data.token);
        this.router.navigate(['/signin']);
      },
      (data: any) => {
        this.error = data.error.message;
      });
  }
}
