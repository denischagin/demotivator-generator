import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {GetDemotivatorBody} from "../types/get-demotivator-body";

@Injectable({
  providedIn: 'root'
})
export class DemotivatorService {

  constructor(public http: HttpClient) {
  }

  public getDemotivator({fileFormData, text2, text1}: GetDemotivatorBody) {
    return this.http.post('https://demotivator-generator.vercel.app', fileFormData, {
      params: new HttpParams(
        {
          fromObject: {
            text1: text1 ?? '',
            text2: text2 ?? '',
          }
        }
      ),
      headers: new HttpHeaders({
        'Accept': 'image/svg+xml',
      }),
      responseType: 'blob',
    })
  }


}
