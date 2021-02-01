import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {MatDialog} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../article-add/article-add.component";

@Component({
  selector: 'app-insatnce-storage-add',
  templateUrl: './storage-add-insatnce.component.html',
  styleUrls: ['./storage-add-insatnce.component.scss']
})
export class StorageInstanceAddComponent {
  form!: FormGroup;
  error = "";
  unitTypes: any;
  loaded = false;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder) {

    this.unitsService.getAllUnitTypes().subscribe((data: any) => {
      this.unitTypes = data;
      this.loaded = true;
    });

    this.form = this.formBuilder.group({
      id: [
        Guid.create().toString(),
        [
          Validators.required
        ]
      ],
      instanceId: [
        this.tokenService.currentInstanceSubject.value.id,
        [
          Validators.required
        ]
      ],
      unitTypeId: [
        "",
        [
          Validators.required
        ]
      ],
      phone: [
        "",
        [
          Validators.required
        ]
      ],
      workingFormat: [
        "",
        [
          Validators.required
        ]
      ],
      adress: [
        "",
        [
          Validators.required
        ]
      ],
      name: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(ArticleAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmin() {
    this.identityService.getIdentity().subscribe((data: any) => {
      this.unitsService.createUnit(this.form.value)
        .subscribe(
          (data: any) => {

          },
          (error: any) => {
            console.log(error);
          }
        )
    });
  }
}
