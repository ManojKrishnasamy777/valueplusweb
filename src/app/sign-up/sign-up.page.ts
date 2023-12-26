import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { IonBackButton, IonCard, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { CommonService } from '../Service/common.service';
import { CommonHelperService } from '../Helper/common-helper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonHelper } from '../Helper/CommonHelper';

import { environment } from 'src/environments/environment';
// import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  styles: [
    `.content-container {
      max-width: 400px;
    }`
  ],
})
export class SignUpPage implements OnInit {
  SignupData: any = {};
  //@ts-ignore
  SigninForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: CommonService,
    private helper: CommonHelperService,
    private formbuilder: FormBuilder,
    private commonHelper: CommonHelper

  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.SigninForm = this.formbuilder.group({
      loginName: new FormControl('', Validators.compose([Validators.nullValidator])),
      mobileNo: new FormControl('', Validators.compose([Validators.nullValidator])),
      server_name: new FormControl('', Validators.compose([Validators.nullValidator]))
    });
  }

  get fc() {
    return this.SigninForm.controls;
  }

  async Signup() {
    debugger
    if (this.SigninForm.valid == true) {
      let res: any = {};
      let SaveData: any = {};
      SaveData['mobileNo'] = this.SignupData.mobileNo;
      SaveData['loginName'] = this.SignupData.loginName;
      res = await this.httpService.CommonPost(SaveData, "v1/Auth/Login");
      if (res.type == 'S') {
        let ResData: any = {};
        ResData['server_name'] = this.SignupData.server_name + '/api';
        ResData['mobileNo'] = this.SignupData.mobileNo;
        ResData['loginName'] = this.SignupData.loginName;
        ResData['api_token'] = res.response.token;
        ResData['userId'] = res.response.userId;
        this.helper.SetLocalStorage(this.helper.StorageName, ResData);
        this.helper.presentSuccessToast(res.message);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }

    }
    else {
      this.commonHelper.validateAllFormFields(this.SigninForm);
    }
  }

}
