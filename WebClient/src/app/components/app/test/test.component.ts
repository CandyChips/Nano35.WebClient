import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  form!: FormGroup;
  categoryForm!: FormGroup;
  allFruits: {id: Guid, name: string, parentCategoryId : Guid}[] = [];
  filteredAllFruits: Observable<any[]> | undefined;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.categoryForm = this.formBuilder.group({
      name: [
        ""
      ]
    });

    this.http.get<any>("http://localhost:5000/articles").subscribe((success: any) => {
      this.allFruits = success;
      this.filteredAllFruits = this.categoryForm.controls.name.valueChanges.pipe(
        startWith(''),
        map(item => this.allFruits.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  get itemsArr() {
    return this.form.get('items') as FormArray;
  }

  onCreate() {
    this.allFruits = [];
    let newItem = {id: Guid.create().toString(), name: this.categoryForm.controls.name.value, parentCategoryId: this.itemsArr.at(this.itemsArr.length - 1).value.id };
    console.log(newItem);
    this.http.post<any>("http://localhost:5000/articles", newItem).subscribe((success: any) => {
      this.itemsArr.push(this.formBuilder.group(newItem));
      this.categoryForm.controls.name.setValue('');
      this.http.get<any>("http://localhost:5000/articles?id=" + this.itemsArr.at(this.itemsArr.length - 1).value.id).subscribe((success: any) => {
        this.allFruits = success;
        this.filteredAllFruits = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allFruits.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    });
  }

  onSelect(tag: any) {
    this.allFruits = [];
    this.itemsArr.push(
      this.formBuilder.group(tag)
    );
    this.http.get<any>("http://localhost:5000/articles?id=" + this.itemsArr.at(this.itemsArr.length - 1).value.id).subscribe((success: any) => {
      this.allFruits = success;
      this.filteredAllFruits = this.categoryForm.controls.name.valueChanges.pipe(
        startWith(''),
        map(item => this.allFruits.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
    });
  }

  onRemove(index: number) {
    this.allFruits = [];
    for (let i = index; this.itemsArr.at(i) != null;)
    {
      console.log(i);
      this.itemsArr.removeAt(i);
    }
    if(this.itemsArr.length == 0)
    {
      this.http.get<any>("http://localhost:5000/articles").subscribe((success: any) => {
        this.allFruits = success;
        this.filteredAllFruits = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allFruits.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    }
    else
    {
      this.http.get<any>("http://localhost:5000/articles?id=" + this.itemsArr.at(this.itemsArr.length - 1).value.id).subscribe((success: any) => {
        this.allFruits = success;
        this.filteredAllFruits = this.categoryForm.controls.name.valueChanges.pipe(
          startWith(''),
          map(item => this.allFruits.filter(value => value.name.toLocaleLowerCase().indexOf(item.toLowerCase()) === 0)))
      });
    }
  }
}
