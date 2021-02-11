import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {ClientsService} from "../../../../../services/clients.service";
import {TokenService} from "../../../../../services/token.service";
import {ClientsAddDialogComponent} from "../../../clients/clients-add/clients-add.component";
import {StorageService} from "../../../../../services/storage.service";
import {Observable} from "rxjs";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  categories: any[] = [];
  filteredCategories!: Observable<any[]>;
  selectedCategories: any[] = [];

  categoryFilterControl = new FormControl();
  selectCategoryControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) {

    this.storageService.getRootCategories(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.categories = success;
        this.filteredCategories = this.categoryFilterControl.valueChanges.pipe(
          startWith(''),
          map(item =>
            this.categories.filter((option: any) =>
              option.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)));
    });
    this.selectCategoryControl.valueChanges.subscribe((success: any) => {
      this.categories = [];
      this.dataChanged.emit(success);
      this.selectedCategories.push(success);
      if(success.id == Guid.createEmpty()) {
        this.storageService.getRootCategories(this.tokenService.currentInstanceId)
          .subscribe((success: any) => {
            this.categories = success;
            this.filteredCategories = this.categoryFilterControl.valueChanges.pipe(
              startWith(''),
              map(item =>
                this.categories.filter((option: any) =>
                  option.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)));
          });
      }
      else {
        this.storageService.getSubCategoriesById(success.id)
          .subscribe((success: any) => {
            this.categories = success;
            this.filteredCategories = this.categoryFilterControl.valueChanges.pipe(
              startWith(''),
              map(item =>
                this.categories.filter((option: any) =>
                  option.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)));
          });
      }
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  onRemoveCategory(index: number) {
    this.categories = [];

    this.selectedCategories.splice(index, this.selectedCategories.length - index);

    if(this.selectedCategories.length == 0)
    {
      this.storageService.getRootCategories(
        this.tokenService.currentInstanceId).subscribe((success: any) => {
        this.categories = success;
        this.filteredCategories = this.categoryFilterControl.valueChanges.pipe(
          startWith(''),
          map(item => this.categories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
      this.dataChanged.emit(null);
    }
    else
    {
      this.storageService.getSubCategoriesById(
        this.selectedCategories[this.selectedCategories.length - 1].id).subscribe((success: any) => {
        this.categories = success;
        this.filteredCategories = this.categoryFilterControl.valueChanges.pipe(
          startWith(''),
          map(item => this.categories.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
      this.dataChanged.emit(this.selectedCategories[this.selectedCategories.length - 1]);
    }
  }

  onCreateCategory() {
    this.categories = [];

    let parent = this.selectedCategories.length == 0 ?
      Guid.createEmpty().toString() :
      this.selectedCategories[this.selectedCategories.length - 1].id;

    let newItem = {
      instanceId: this.tokenService.currentInstanceId,
      newId: Guid.create().toString(),
      name: this.categoryFilterControl.value,
      parentCategoryId: parent };

    this.storageService.createSubCategories(newItem).subscribe((success: any) => {
      this.selectedCategories.push(newItem);
      this.categoryFilterControl.setValue('');
    });
  }
}
