import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { StateComponent, StateModule } from 'src/app/state/state.component';
import { CityModule } from "../../City/city.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { EmployeeModel, EmployeeQualificationModel } from 'src/Model/Employee.model';
import { DateFormat } from 'src/Helper/DateFormat';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DepartmentEnum } from 'src/Helper/Enum/DepartmentEnum';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  UserList: any = [];
  EmployeeId: any = 0;
  EmployeeForm: FormGroup;
  EmployeeRoledropdown: any = [];
  EmployeeData: EmployeeModel = new EmployeeModel();
  EmployeeQualificationData: EmployeeQualificationModel = new EmployeeQualificationModel();
  EmployeelDialog: boolean;
  CountryList: any = [];
  StateList: any = [];
  CityList: any = [];
  EmployeeList: any = [];
  EmployeeQualificationForm: FormGroup;
  EmployeeQualificationList: any = [];
  SpecilizationList: any = [];
  SpecificationId: string = '';
  DepartmentList:any=[];
  QualificationList: any = [];

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.helper.ShowSpinner();
    this.EmployeeId = this.route.snapshot.params["id"];
    this.EmployeeForm = this.formbuilder.group({
      first_name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.nullValidator])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
      date_of_joining: new FormControl('', Validators.compose([Validators.required])),
      year_of_experiance: new FormControl('', Validators.compose([Validators.nullValidator])),
      date_of_birth: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      state_id: new FormControl('', Validators.compose([Validators.required])),
      city_id: new FormControl('', Validators.compose([Validators.required])),
      zip_code: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
      department: new FormControl('', Validators.compose([Validators.required]))
    });

    await this.GetEmployeeById();
    await this.GetUserList();
    await this.GetCountryList();
    this.GetDepartmentList();
    this.helper.HideSpinner();
  }

  GetDepartmentList() {
        this.DepartmentList = [];
        this.DepartmentList = this.helper.ConvertEnumToArray(DepartmentEnum);
    }
 

  EmployeeValidationMessages = {
    'first_name': [{ type: 'required', message: 'Please select First Name.' },],
    'email': [{ type: 'required', message: 'Required .' }, { type: 'pattern', message: 'Invalid email' }],
    'date_of_joining': [{ type: 'required', message: 'Date of Joining cannot be blank.' },],
    'year_of_experiance': [{ type: 'required', message: 'Year Of Experience cannot be blank.' },],
    'date_of_birth': [{ type: 'required', message: 'Please select Date Of Birth.' },],
    'address': [{ type: 'required', message: 'Address cannot be blank.' },],
    'state_id': [{ type: 'required', message: 'Please select State/Tertiary.' },],
    'city_id': [{ type: 'required', message: 'Please select City.' },],
    'zip_code': [{ type: 'required', message: 'Zipcode cannot be blank.' },],
    'country_id': [{ type: 'required', message: 'Please select Country.' },],
    'department': [{ type: 'required', message: 'Please select Department.' },],
  };

  QualificationValidationMessages = {
    'qualification_id': [{ type: 'required', message: 'Please select Qualification.' },],
    'specification': [{ type: 'required', message: 'Date of joining cannot be blank.' },],
  };

  async GetEmployeeById() {
    if (this.EmployeeId != 0) {
      let res = await this.service.GetAll(`v1/Employee/ById/${this.EmployeeId}`);
      if (res) {
        this.EmployeeData = res;
        await this.GetEmployeeQualificationById();
        await this.EmployeeDropdownList();
        await this.GetStateListByCountryId(this.EmployeeData.country_id);
        await this.GetCityListByStateId(this.EmployeeData.state_id);
      }
    }
  }

  async CreateEmployee(id: number) {
    debugger
    this.EmployeeQualificationForm = this.formbuilder.group({
      qualification_id: new FormControl('', Validators.compose([Validators.required])),
      year_of_completion: new FormControl('', Validators.compose([Validators.nullValidator])),
      certificate_name: new FormControl('', Validators.compose([Validators.nullValidator])),
      duration: new FormControl('', Validators.compose([Validators.nullValidator])),
    })
    if (id) {
      this.helper.ShowSpinner();
      let res = await this.service.GetById(id, "v1/EmployeeQualification/ById");
      this.EmployeeQualificationData = res;
      this.helper.HideSpinner();
    }
    else {
      this.EmployeeQualificationData = new EmployeeQualificationModel(); ;
    }
    await this.GetEmployeeQualificationList();
    this.EmployeelDialog = true;
    this.helper.HideSpinner();
  }

  async GetEmployeeQualificationById() {
    debugger
    if (this.EmployeeId != 0) {
      let res = await this.service.GetAll(`v1/EmployeeQualification/ByEmployeeId/${this.EmployeeId}`);
      if (res) {
        this.EmployeeQualificationList = res;
      }
    }
  }

  async EmployeeDropdownList() {
    let res = await this.service.GetAll("v1/EmployeeQualification/List");
    if (res) {
      this.EmployeeList = res;
    }
  }

  async GetCountryList() {
    let res = await this.service.GetAll("v1/Country/List");
    if (res) {
      this.CountryList = res;
    }
  }

  async GetStateListByCountryId(id: string) {
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

  CloseDialouge() {
    this.EmployeelDialog = false;
  }

  async GetUserList() {
    let res = await this.service.GetAll("v1/User/List");
    if (res) {
      res.map(o => o.fullname = o.first_name + ' ' + o.last_name);
      this.UserList = res;
    }
  }

  async GetEmployeeQualificationList() {
    debugger
    let res = await this.service.GetAll("v1/Qualification/List");
    if (res) {
      res.map( o => o.label = o.degree + ' - ' + o.specialization);
      this.QualificationList =  res;
    }
  }

  async Save() {
    if (this.EmployeeForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.EmployeeId != 0) {
        res = await this.service.CommonPut(this.EmployeeData, `v1/Employee/Update/${this.EmployeeData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.EmployeeData, "v1/Employee/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        let id = res.AddtionalData ? res.AddtionalData : this.EmployeeId;
        this.helper.redirectTo("Employee/" + id);
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
      this.helper.validateAllFormFields(this.EmployeeForm);
      this.helper.HideSpinner();
    }
  }

  async SaveEmployeeQualification() {
    debugger
    if (this.EmployeeQualificationForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      this.EmployeeQualificationData.employee_id = this.EmployeeId;
      if (this.EmployeeQualificationData.id != 0 ) {
        res = await this.service.CommonPut(this.EmployeeQualificationData, `v1/EmployeeQualification/Update/${this.EmployeeQualificationData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.EmployeeQualificationData, "v1/EmployeeQualification/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        await this.GetEmployeeQualificationById();
        this.EmployeelDialog = false;
      }
      else if (res.Type == "W") {
        this.helper.WarningToastr(res.Message);
      }
      else {
        this.helper.ErrorToastr(res.Message);
      }
      this.helper.HideSpinner(); this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.EmployeeQualificationForm);
      this.helper.HideSpinner();
    }
  }

}

const routes: Routes = [
  { path: "", component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ModuleData,
    DropdownModule,
    ConfirmDialogModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    InputSwitchModule,
    TabViewModule,
    StateModule,
    CityModule,
    FileUploadModule,
    CalendarModule,
    InputTextModule,
    DialogModule
  ],
})
export class EmployeeModule { }
