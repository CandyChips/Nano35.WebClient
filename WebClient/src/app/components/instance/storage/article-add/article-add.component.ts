import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {StorageService} from "../../../../services/storage.service";
import {TokenService} from "../../../../services/token.service";


@Component({
  selector: 'app-insatnce-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddDialogComponent {
  form!: FormGroup;
  articleTypes: any;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ArticleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.storageService.getAllArticleTypes().subscribe((data: any) => {
      this.articleTypes = data;
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
      articleTypeId: [
        "",
        [
          Validators.required
        ]
      ],
      categoryGroup: [
        "",
        [
          Validators.required
        ]
      ],
      category: [
        "",
        [
          Validators.required
        ]
      ],
      brand: [
        "",
        [
          Validators.required
        ]
      ],
      model: [
        "",
        [
          Validators.required
        ]
      ],
    });
    this.isLoading = false;
  }

  onSubmitClick(): void {
    this.isLoading = true;
    this.storageService.createArticle(this.form.value).subscribe((success: any) => {
      this.isLoading = false;
      this.dialogRef.close();

    }, (error: any) => {
      this.isLoading = false;
      alert(error.error.message)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
