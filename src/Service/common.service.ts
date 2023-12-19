import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { CommonHelperService } from 'src/Helper/common-helper.service';
// import { Http, HttpResponse as httpRes } from '@capacitor-community/http';
import { firstValueFrom, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private helper: CommonHelperService
  ) { }

  public async GetAll(UrlName: string, params?:any, header?: any) {
    const options = {
      url: `${this.helper.ApiURL}/${UrlName}`,
      params: params ? params : '',
      ...(header&&{headers: header})
    }
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data;
  }

  public async GetById(id: number, UrlName: string) {
    const response: HttpResponse = await CapacitorHttp.get({
      url: `${this.helper.ApiURL}/${UrlName}/${id}`,
    });
    return response;
  }

  public async CommonPost(model: any, UrlName: string, header?: any) {
    const response: HttpResponse = await CapacitorHttp.post({
      url: `${this.helper.ApiURL}/${UrlName}`,
      data: model,
      ...(header&&{headers: header})
    });
    return response;
  }

  public async Update(model: any, UrlName: string) {
    const response: HttpResponse = await CapacitorHttp.post({
      url: `${this.helper.ApiURL}/${UrlName}/${model.id}`,
      data: model
    });
    return response;
  }
}
