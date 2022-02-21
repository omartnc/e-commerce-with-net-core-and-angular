import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }
  get404Error() {
    this.http.get(`${this.baseUrl}products/38bc9f04-7d4b-4041-97bd-08712721edc8`).subscribe(reponse => {
      console.log(reponse);
    }, error => {
      console.log(error);
    });
  }
  get500Error() {
    this.http.get(`${this.baseUrl}buggy/servererror`).subscribe(reponse => {
      console.log(reponse);
    }, error => {
      console.log(error);
    });
  }
  get400Error() {
    this.http.get(`${this.baseUrl}buggy/badrequest`).subscribe(reponse => {
      console.log(reponse);
    }, error => {
      console.log(error);
    });
  }
  get400ValidationError() {
    this.http.get(`${this.baseUrl}products/asdad123`).subscribe(reponse => {
      console.log(reponse);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }
}
