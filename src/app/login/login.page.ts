import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Service/common.service';
// import { LoadingController, ToastController } from '@ionic/angular';
import { CommonHelperService } from 'src/app/Helper/common-helper.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  styles: [
    `ion-content {
      --background: #fff;
    }`,
    `ion-content::part(scroll) {
      display: grid;
      align-items: center;
      justify-content: center;
    }`
  ]
})

export class LoginPage implements OnInit {
  Userdata: any = {};
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)(\.[a-z]{2,4})$")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: CommonService,
    private helper: CommonHelperService
  ) { }

  async ngOnInit() {
    // const userInfo = await this.helper.getUserInfo();
    // userInfo && this.router.navigate(['/dashboard'], { replaceUrl: true });
  }

  get fc() {
    return this.loginForm.controls;
  }

  async login() {
    debugger
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    const loading: HTMLIonLoadingElement = await this.helper.showSpinner();
    let res: any = {};
    res = await this.httpService.CommonPost(this.loginForm.value, "UserLogin");
    if (res.Type == 'S') {
      let decodedData: any = {};
      decodedData = jwt_decode(res.result.api_token);
      decodedData.company_id = this.helper.EncryptWithSecrectKey(String(decodedData.company_id));
      this.Userdata = { ...decodedData, ...res.result };
      this.helper.SetLocalStorage(this.helper.StorageName, this.Userdata);
      this.helper.presentSuccessToast(res.Message);
      this.GetCompanyData();
      this.router.navigate(['/booking'], { replaceUrl: true });
    }
    else {
      this.helper.presentErrorToast(res.Message);
    }
    loading.dismiss();
  }

  togglePasswordVisibility(eve: MouseEvent) {
    const btn = eve.target as HTMLIonButtonElement;
    const icon = btn.firstElementChild as HTMLIonIconElement;
    const ip = btn.previousElementSibling as HTMLIonInputElement;
    ip.type = ip.type == 'password' ? 'text' : 'password';
    icon.name = ip.type == 'password' ? 'eye-outline' : 'eye-off-outline';
  }

  async GetCompanyData() {
    let UserData: any = {};
    UserData = this.helper.GetUserInfo();
    let CompanyId = this.helper.DecryptWithSecrectKey(UserData.company_id);
    let res = await this.httpService.GetById(Number(CompanyId), "Company");
    if (res) {
      UserData.company = res;

      return res;
    }
  }

}

