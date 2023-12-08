import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  email: string = "";
  UserForm: FormGroup;
  Dialog: boolean = false;
  user_id: string;

  constructor(
    private helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.UserForm = this.formbuilder.group({
      email: new FormControl('', Validators.compose([Validators.required])),
    })
  }

  ForgetPasswordValidationMessages = {
    'email': [{ type: 'required', message: 'Required.' },],
  };


  async ForgotPassword() {
    if (this.UserForm.valid == true) {
      this.helper.ShowSpinner();
      let res = await this.service.CommonPost({ email: this.email }, "v1/Auth/ForgotPassword");
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
  { path: "", component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ModuleData,
    DialogModule,
    CardModule
  ]
})
export class ForgotPasswordModule { }
