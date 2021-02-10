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
  categoriesform!: FormGroup;
  categoryForm!: FormGroup;
  specForm!: FormGroup;
  specsForm!: FormGroup;
  allCategories: {id: Guid, name: string, parentCategoryId : Guid}[] = [];
  filteredAllCategories: Observable<any[]> | undefined;

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

    this.categoryForm = this.formBuilder.group({
      name:
        ["",[Validators.required]],
    });

    this.specForm = this.formBuilder.group({
      item1:
        ["",[Validators.required]],
      item2:
        ["",[Validators.required]],
    });

    this.categoriesform = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.specsForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.storageService.getRootCategories(
      this.tokenService.currentInstanceId).subscribe((success: any) => {
      this.allCategories = success;
      this.filteredAllCategories = this.categoryForm.controls.name.valueChanges.pipe(
        startWith(''),
        map(item => this.allCategories
          .filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)));
      this.isLoading = false;
    });
  }

  private _filter(value: string, array: string[]): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  onSubmitClick(): void {
    console.log(this.categoriesArr.controls[(this.categoriesArr.length - 1)].value.id)
    this.isLoading = true;
    this.form.controls.categoryId.setValue(this.categoriesArr.at(this.categoriesArr.length - 1).value.id);
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

  get categoriesArr() {
    return this.categoriesform.get('items') as FormArray;
  }

  get spcsArr() {
    return this.specsForm.get('items') as FormArray;
  }

  onCreateCategory() {
    this.allCategories = [];
    let parent = this.categoriesArr.length == 0 ?
      Guid.createEmpty().toString() :
      this.categoriesArr.at(this.categoriesArr.length - 1).value.id;
    let newItem = { instanceId: this.tokenService.currentInstanceId, newId: Guid.create().toString(), name: this.categoryForm.controls.name.value, parentCategoryId: parent };
    this.storageService.createSubCategories(newItem).subscribe((success: any) => {
      this.categoriesArr.push(this.formBuilder.group(newItem));
      this.categoryForm.controls.name.setValue('');
      this.storageService.getSubCategoriesById(
        this.categoriesArr.at(this.categoriesArr.length - 1).value.id,
        this.tokenService.currentInstanceId).subscribe((success: any) => {
        this.allCategories = success;
        this.filteredAllCategories = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allCategories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    })
  }

  onCreateSpec(){
    this.spcsArr.push(
      this.formBuilder.group(this.specForm.value)
    );
    this.specForm.reset();
  }


  onSelectCategory(tag: any) {
    this.allCategories = [];
    this.categoriesArr.push(
      this.formBuilder.group(tag)
    );
    this.storageService.getSubCategoriesById(
      this.categoriesArr.controls[(this.categoriesArr.length - 1)].value.id,
      this.tokenService.currentInstanceId).subscribe((success: any) => {
      this.allCategories = success;
      this.filteredAllCategories = this.categoryForm.controls.name.valueChanges.pipe(
        startWith(''),
        map(item => this.allCategories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)));
      this.storageService.getAllArticleModels(
        this.tokenService.currentInstanceId,
        this.categoriesArr.controls[(this.categoriesArr.length - 1)].value.id).subscribe((success: string[]) => {
        this.models = success;
        this.filteredModels = this.form.controls.model.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.models))
        );
        this.storageService.getAllArticleBrands(
          this.tokenService.currentInstanceId,
          this.categoriesArr.controls[(this.categoriesArr.length - 1)].value.id).subscribe((success: string[]) => {
          this.brands = success;
          this.filteredBrands = this.form.controls.brand.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value, this.brands))
          );
        });
      });
    });
  }

  onRemoveCategory(index: number) {
    this.allCategories = [];
    for (let i = index; this.categoriesArr.at(i) != null;)
    {
      this.categoriesArr.removeAt(i);
    }
    if(this.categoriesArr.length == 0)
    {
      this.storageService.getRootCategories(
        this.tokenService.currentInstanceId).subscribe((success: any) => {
        this.allCategories = success;
        this.filteredAllCategories = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allCategories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    }
    else
    {
      this.storageService.getSubCategoriesById(
        this.categoriesArr.at(this.categoriesArr.length - 1).value.id,
        this.tokenService.currentInstanceId).subscribe((success: any) => {
        this.allCategories = success;
        this.filteredAllCategories = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allCategories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    }
  }

}
