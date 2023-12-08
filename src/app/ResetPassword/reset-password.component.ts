import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordModel } from 'src/Model/ResetPassword.model';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent implements OnInit {
  ResetPasswordData: ResetPasswordModel = new ResetPasswordModel();
  UserForm: FormGroup;

  constructor(
    private helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.UserForm = this.formbuilder.group({
      reset_otp: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    })
  }

  ForgetPasswordValidationMessages = {
    'reset_otp': [{ type: 'required', message: 'Required.' },],
    'password': [{ type: 'required', message: 'Required.' }, { type: 'minlength', message: 'At least 6 characters, but longer is better.' }],
  };

  async ResetPassword() {
    if (this.UserForm.valid == true) {
      this.helper.ShowSpinner();
      this.ResetPasswordData.user_id = this.activatedRoute.snapshot.params["id"];
      let res = await this.service.CommonPost(this.ResetPasswordData, "ResetPassword");
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("/Login");
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.UserForm)
    }
  }
}
const routes: Routes = [
  { path: "", component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ModuleData,
    PasswordModule
  ]
})
export class ResetPasswordModule { }
