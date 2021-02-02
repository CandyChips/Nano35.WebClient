import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {MatDialog} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../article-add/article-add.component";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-insatnce-storage-add',
  templateUrl: './storage-add-insatnce.component.html',
  styleUrls: ['./storage-add-insatnce.component.scss']
})
export class StorageInstanceAddComponent {
  form!: FormGroup;
  error = "";
  conditions: any;
  articles: any;
  loaded = false;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private storageService: StorageService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder) {

    this.storageService.getAllStorageItemConditions().subscribe((success: any) => {
      this.conditions = success;
      this.storageService.getAllArticles(this.tokenService.currentInstanceSubject.value.id).subscribe((success: any) => {
        this.articles = success;
        this.loaded = true;
      })
    }, (error: any) => {

    });

    this.form = this.formBuilder.group({
      newId: [
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
      comment: [
        "",
        [
          Validators.required
        ]
      ],
      hiddenComment: [
        "",
        [
          Validators.required
        ]
      ],
      retailPrice: [
        "",
        [
          Validators.required
        ]
      ],
      purchasePrice: [
        "",
        [
          Validators.required
        ]
      ],
      articleId: [
        "",
        [
          Validators.required
        ]
      ],
      conditionId: [
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
    this.storageService.createStorageItem(this.form.value)
      .subscribe(
        (data: any) => {

        },
        (error: any) => {
          console.log(error);
        });
  }
}
