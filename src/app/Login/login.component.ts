import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import jwt_decode from "jwt-decode";
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UserLoginModel } from 'src/Model/UserLogin.model';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  User: any = {};
  UserForm: FormGroup;
  LoginAuthDialog: Boolean = false;
  Userdata: any = {};
  ValidateData: UserLoginModel = new UserLoginModel();
  

  constructor(
    private helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.UserForm = this.formbuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      plat_form: new FormControl('', Validators.compose([Validators.nullValidator])),
    });
    if (this.helper.GetUserInfo()?.id > 0) {
      this.helper.DeleteAllLocalStorage();
    }
  }

  LoginValidationMessages = {
    'email': [{ type: 'required', message: 'Required.' }, { type: 'pattern', message: 'Invalid email' }],
    'password': [{ type: 'required', message: 'Required.' }, { type: 'minlength', message: 'At least 6 characters, but longer is better.' }],
  };

  async LoginCommonCall(data: any) {
    debugger
    this.helper.ShowSpinner();
    this.User.plat_form = "W"
    let res = await this.service.CommonPost(data, "v1/Auth/Login");
    if (res.Type == "S") {
      let decoded: any = {};
      decoded = jwt_decode(res.result.api_token);
      this.Userdata = { ...decoded, ...res.result };
      if (this.Userdata.is_twofa) {
        this.LoginAuthDialog = true;
        this.helper.HideSpinner();
      }
      else {
        this.helper.SucessToastr(res.Message);
        this.helper.SetLocalStorage(this.helper.StorageName, this.Userdata);
        if (this.Userdata?.landing_page) {
          this.helper.redirectTo(this.Userdata?.landing_page);
        }
        else {
          this.helper.redirectTo("AdminDashboard");
        }
        this.helper.HideSpinner();
      }
    }
    else {
      this.helper.HideSpinner();
      this.helper.ErrorToastr(res.Message);
    }

  }

  async Login() {
    if (this.UserForm.valid == true) {
      this.LoginCommonCall(this.User);
    }
  }
}

const routes: Routes = [
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModuleData,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    PasswordModule
  ],
})
export class LoginModule { }
