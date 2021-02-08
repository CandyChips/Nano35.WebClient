import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../article-add/article-add.component";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-insatnce-storage-add',
  templateUrl: './storage-add-insatnce.component.html',
  styleUrls: ['./storage-add-insatnce.component.scss']
})
export class StorageInstanceAddComponent {
  form!: FormGroup;
  isLoading = true;
  error = "";
  conditions: any;
  articles: any;
  images = [];

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private storageService: StorageService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StorageInstanceAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.updateContent();
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
      ],
      file: ['', [Validators.required]],

      fileSource: ['', [Validators.required]]
    });
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      this.images = [];
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          // @ts-ignore
          this.images.push(event.target.result);
          this.form.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  updateContent() {
    this.storageService.getAllStorageItemConditions().subscribe((success: any) => {
      this.conditions = success;
      this.storageService.getAllArticles(this.tokenService.currentInstanceSubject.value.id).subscribe((success: any) => {
        this.articles = success;
        this.isLoading = false;
      })
    }, (error: any) => {

    });
  }

  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(ArticleAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateContent();
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmin() {
    this.isLoading = true;
    this.storageService.createStorageItem(this.form.value)
      .subscribe(
        (data: any) => {
          this.dialogRef.close();
        },
        (error: any) => {
          this.isLoading = false;
          alert(error.error.message)
        });
  }
}
