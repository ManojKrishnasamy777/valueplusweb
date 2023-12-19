import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHelper } from '../Helper/CommonHelper';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient, private helper: CommonHelper) {

  }

  public GetAll(UrlName: string) {
    return lastValueFrom(this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}`));
  }

  public GetById(id: number, UrlName: string) {
    return lastValueFrom(this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}/${id}`));
  }

  public CommonPost(model: any, UrlName: string) {
    return lastValueFrom(this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, Object.assign({}, model)));
  }

  public CommonPut(model: any, UrlName: string) {
    return lastValueFrom(this.httpClient.put(`${this.helper.ApiURL}/${UrlName}`, Object.assign({}, model)));
  }

  public Delete(UrlName: string) {
    return lastValueFrom(this.httpClient.delete(`${this.helper.ApiURL}/${UrlName}`));
  }

  public PostWithParameter(model: any, UrlName: string, params: any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach((e: { params: string; }) => {
      url = url + "/" + e.params;
    });
    return lastValueFrom(this.httpClient.post(url, Object.assign({}, model)));
  }

  public GetWithParameter(UrlName: string, params: any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach((e: { params: string; }) => {
      url = url + "/" + e.params;
    });
    return lastValueFrom(this.httpClient.get<any>(url));
  }

  public FullUrlGet(UrlName: string) {
    return lastValueFrom(this.httpClient.get<any>(UrlName, { headers: { "Anonymous": '' } }));
  }


  public DownloadPost(model: any, UrlName: string) {
    return lastValueFrom(this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, Object.assign({}, model), { observe: "response", responseType: "blob" }));
  }

  public DownloadGet(id: any, UrlName: string) {
    return lastValueFrom(this.httpClient.get(`${this.helper.ApiURL}/${UrlName}/${id}`, { observe: "response", responseType: "blob" }));
  }

  public UploadPost(model: any, UrlName: string) {
    return lastValueFrom(this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, model));
  }
}
