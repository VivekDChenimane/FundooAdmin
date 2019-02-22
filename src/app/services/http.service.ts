import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import {} from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  postRequest(url, data) {
    console.log(data);
    return this.http.post(this.baseUrl + url, data);
}
getRequest(url) {
  return this.http.get(this.baseUrl + url);
}
}
