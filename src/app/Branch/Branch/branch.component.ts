import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
})
export class BranchComponent implements OnInit {
  BranchForm: FormGroup;
  CameraSettingForm: FormGroup;
  BranchData: any = [];
  BranchId: any = [];
  CountryList: any = [];
  StateList: any = [];
  CityList: any = [];
  CameraSettingData: any = {}
  CameraSettingDialog: boolean = false;
  CameraSettingList: any = [];

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }


  async ngOnInit() {
    this.helper.ShowSpinner();
    this.BranchId = this.route.snapshot.params["id"];
    this.BranchForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      city_id: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      state_id: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
      mobile: new FormControl('', Validators.compose([Validators.nullValidator])),
      postal_code: new FormControl('', Validators.compose([Validators.nullValidator])),
    });
    await this.GetCountryList();
    await this.GetEmployeeById();
    await this.GetCameraSettingList();
    this.helper.HideSpinner();
  }

  BranchValidationMessages = {
    'name': [{ type: 'required', message: 'Name cannot be blank.' },],
    'address': [{ type: 'required', message: 'Address cannot be blank.' },],
    'city_id': [{ type: 'required', message: 'Please select City.' },],
    'state_id': [{ type: 'required', message: 'Please select State.' },],
    'email': [{ type: 'required', message: 'Required.' }, { type: 'pattern', message: 'Invalid email' }],
    'country_id': [{ type: 'required', message: 'Please select Country.' },],
  };

  CameraSettingValidationMessages = {
    'camera_name': [{ type: 'required', message: 'Camera name cannot be blank.' },],
    'camera_ip': [{ type: 'required', message: 'Camera URL cannot be blank.' },]
  }


  async GetEmployeeById() {
    debugger
    if (this.BranchId != 0) {
      let res = await this.service.GetAll(`v1/Branch/ById/${this.BranchId}`);
      if (res) {
        this.BranchData = res;
        await this.GetStateListByCountryId(this.BranchData.country_id);
        await this.GetCityListByStateId(this.BranchData.state_id);
      }
    }
  }


  async GetCountryList() {
    let res = await this.service.GetAll("v1/Country/List");
    if (res) {
      this.CountryList = res;
    }
  }

  async GetStateListByCountryId(id: string) {
    debugger
    let res = await this.service.GetAll(`v1/State/ByCountryId/${id}`);
    if (res) {
      this.StateList = res;
    }
  }


  async GetCityListByStateId(id: string) {
    let res = await this.service.GetAll(`v1/City/ByStateId/${id}`);
    if (res) {
      this.CityList = res;
    }
  }


  async CreateCameraSetting(id: number) {
    debugger
    this.CameraSettingForm = this.formbuilder.group({
      camera_name: new FormControl('', Validators.compose([Validators.required])),
      camera_ip: new FormControl('', Validators.compose([Validators.required])),
    });
    if (id) {
      this.helper.ShowSpinner();
      let res = await this.service.GetById(id, "v1/Camera/ById");
      this.CameraSettingData = res;
      this.helper.HideSpinner();
    }
    else {
      this.CameraSettingData = {};
    }
    this.CameraSettingDialog = true;
  }




  async Save() {
    debugger
    if (this.BranchForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.BranchId != 0) {
        res = await this.service.CommonPut(this.BranchData, `v1/Branch/Update/${this.BranchData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.BranchData, "v1/Branch/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("BranchList");
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
      this.helper.validateAllFormFields(this.BranchForm);
    }
  }

  async GetCameraSettingList() {
    let res = await this.service.GetAll(`v1/Camera/ByBranchId/${this.BranchId}`);
    if (res) {
      this.CameraSettingList = res;
    }
  }


  async SaveCameraSettings() {
    if (this.CameraSettingForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      this.CameraSettingData.branch_id = this.BranchId;
      if (this.CameraSettingData.id) {
        res = await this.service.CommonPut(this.CameraSettingData, `v1/Camera/Update/${this.CameraSettingData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.CameraSettingData, "v1/Camera/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        await this.GetCameraSettingList();
        this.CameraSettingDialog = false;
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
      this.helper.validateAllFormFields(this.CameraSettingForm);
    }
  }

  CloseDialouge() {
    this.CameraSettingDialog = false;
  }




}



const routes: Routes = [
  { path: "", component: BranchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }

@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ModuleData,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    DropdownModule,
    DialogModule
  ],
})
export class BranchtModule { }



