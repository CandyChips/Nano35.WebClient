import {Component} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Guid} from "guid-typescript";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  public progress!: number;
  public message!: string;
  private id!: Guid;
  constructor(private http: HttpClient) {
    this.id = Guid.create();
  }

  upload(files: any) {
    if (files.length === 0)
      return;
    const formData = new FormData();
    for (let file of files)
      formData.append(file.name, file);
    const uploadReq = new HttpRequest(
      'POST',
      `http://localhost:5005/images/CreateStorageItemImage`,
      formData, {
        reportProgress: true,
        headers: new HttpHeaders({id: this.id.toString()})
      });
    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        { // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);
        }
      else if (event.type === HttpEventType.Response)
        { // @ts-ignore
          this.message = event.body.toString();
        }
    });
  }
}
