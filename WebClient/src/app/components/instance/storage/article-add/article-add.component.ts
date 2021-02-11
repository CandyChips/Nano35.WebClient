import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {StorageService} from "../../../../services/storage.service";
import {TokenService} from "../../../../services/token.service";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";


@Component({
  selector: 'app-insatnce-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.scss']
})
export class ArticleAddDialogComponent {
  specForm!: FormGroup;
  specsForm!: FormGroup;

  models!: string[];
  filteredModels!: Observable<string[]>;
  brands!: string[];
  filteredBrands!: Observable<string[]>;

  form!: FormGroup;
  articleTypes: any;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ArticleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      newId:
        [Guid.create().toString(),[Validators.required]],
      instanceId:
        [this.tokenService.currentInstanceId,[Validators.required]],
      categoryId:
        ["",[Validators.required]],
      brand:
        ["",[Validators.required]],
      model:
        ["",[Validators.required]],
      info:
        [""],
      specs:
        [null]
    });

    this.specForm = this.formBuilder.group({
      item1:
        ["",[Validators.required]],
      item2:
        ["",[Validators.required]],
    });

    this.specsForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  private _filter(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmitClick(): void {
    this.isLoading = true;
    this.form.controls.specs.setValue(this.spcsArr.value);
    console.log(this.form.value);
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

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  get spcsArr() {
    return this.specsForm.get('items') as FormArray;
  }
  onCreateSpec() {
    this.spcsArr.push(
      this.formBuilder.group(this.specForm.value)
    );
    this.specForm.reset();
  }

  onChangeCategory(data: any) {
    this.form.controls.categoryId.setValue(data.id);
  }
}
