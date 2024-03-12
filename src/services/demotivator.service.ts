import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DemotivatorService {

  constructor(public http: HttpClient) {
  }

  public getDemotivator(fileFormData: FormData, text1: string, text2: string) {
    return this.http.post('https://demotivator-generator.vercel.app', fileFormData, {
      params: new HttpParams(
        {
          fromObject: {
            text1: text1,
            text2: text2
          }
        }
      ),
      headers: {
        'Content-Type':'multipart/form-data'
      }
    })
  }
}
