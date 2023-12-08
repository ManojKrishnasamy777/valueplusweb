import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { UserRoleModel } from 'src/Model/UserRole.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
})
export class UserRoleComponent implements OnInit {
  UserRoleData: UserRoleModel = new UserRoleModel();
  UserRoleForm: FormGroup;
  UserRoleId: number = 0;
  LandingPagedropdown: any = [];

  constructor(
    private service: CommonService,
    public helper: CommonHelper,
    private route: ActivatedRoute,
    public commonservice: CommonService,
    private formbuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.UserRoleForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([Validators.required])),
      landing_page: new FormControl('', Validators.compose([Validators.nullValidator]))
    })
    this.helper.ShowSpinner();
    this.UserRoleId = this.route.snapshot.params["id"];
    await this.GetUserRoleData();
    this.helper.HideSpinner();
  }

  UserRoleValidationMessages = {
    'name': [{ type: 'required', message: 'Name cannot be blank.' },],
    'code': [{ type: 'required', message: 'Code cannot be blank.' },]
  };

  async GetUserRoleData() {
    debugger
    if (this.UserRoleId != 0) {
      this.UserRoleData = await this.service.GetAll(`v1/UserRole/ById/${this.UserRoleId}`);
    }
  }

  async Save() {
    debugger
    if (this.UserRoleForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.UserRoleData.id) {
        res = await this.service.CommonPut(this.UserRoleData, `v1/UserRole/Update/${this.UserRoleData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.UserRoleData, "v1/UserRole/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("UserRoleList");
      }
      else if (res.Type == "W") {
        this.helper.WarningToastr(res.Message);
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.UserRoleForm);
    }
  }
}

const routes: Routes = [
  { path: "", component: UserRoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleRoutingModule { }

@NgModule({
  declarations: [UserRoleComponent],
  imports: [
    CommonModule,
    UserRoleRoutingModule,
    ModuleData,
    DropdownModule,
    TableModule,
    ButtonModule
  ],
})
export class UserRoleModule { }