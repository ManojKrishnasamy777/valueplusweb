import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { IonBackButton, IonCard, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { CommonService } from '../Service/common.service';
import { CommonHelperService } from '../Helper/common-helper.service';
import jwt_decode from "jwt-decode";

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: CommonService,
    private helper: CommonHelperService
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  async Signup() {
    debugger
    let res: any = {};
    res = await this.httpService.CommonPost(this.SignupData, "v1/Auth/Login");
    if (res.type == 'S') {
      let ResData: any = {};
      ResData['server_name'] = this.SignupData.server_name;
      ResData['mobileNo'] = this.SignupData.mobileNo;
      ResData['loginName'] = this.SignupData.loginName;
      ResData['api_token'] = res.response.token;
      this.helper.SetLocalStorage(this.helper.StorageName, ResData);
      this.helper.presentSuccessToast(res.message);
    }

  }

}
