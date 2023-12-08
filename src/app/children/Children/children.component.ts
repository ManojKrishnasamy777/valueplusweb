import { Component, OnInit, NgModule } from "@angular/core";
import { Routes, RouterModule, ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModuleData } from "src/Helper/Modules";
import { CommonHelper } from "src/Helper/CommonHelper";
import { CommonService } from "src/Service/Common.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { TabViewModule } from "primeng/tabview";
import { CheckboxModule } from "primeng/checkbox";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { CardModule } from "primeng/card";
import { InputSwitchModule } from "primeng/inputswitch";
import { StateComponent, StateModule } from "src/app/state/state.component";
import { CityModule } from "../../City/city.component";
import { FileUploadModule } from "primeng/fileupload";
import { CalendarModule } from "primeng/calendar";
import { GenderEnum } from "src/Helper/Enum/GenderEnum";

@Component({
  selector: "app-children",
  templateUrl: "./children.component.html",
})
export class ChildrenComponent implements OnInit {
  Childrenlist: any = [];
  ChildrenId: any = 0;
  ChildrenForm: FormGroup;
  ChildrenRoledropdown: any = [];
  ChildrenData: any = {};
  CountryList: any = [];
  StateList: any = [];
  CityList: any = [];
  ChildrenList: any = [];
  GenderList: any;

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.helper.ShowSpinner();
    this.ChildrenId = this.route.snapshot.params["id"];
    this.ChildrenForm = this.formbuilder.group({
      first_name: new FormControl("", Validators.compose([Validators.required])),
      last_name: new FormControl("", Validators.compose([Validators.nullValidator])),
      gender: new FormControl("", Validators.compose([Validators.required])),
      date_of_birth: new FormControl("", Validators.compose([Validators.required])),
      assessment_info: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      country_id: new FormControl("", Validators.compose([Validators.required])),
      state_id: new FormControl("", Validators.compose([Validators.required])),
      city_id: new FormControl("", Validators.compose([Validators.required])),
      zip_code: new FormControl("", Validators.compose([Validators.required])),
      student_number: new FormControl("", Validators.compose([Validators.nullValidator])),
    });


    this.GetGenderChildrenlist();
    await this.GetCountryList();
    await this.GetChildrenById();
    this.helper.HideSpinner();
  }

  ChildrenValidationMessages = {
    first_name: [{ type: "required", message: "First Name cannot be blank." }],
    gender: [{ type: "required", message: "Please select Gender." }],
    date_of_birth: [{ type: "required", message: "Please select Date of Birth." },],
    assessment_info: [{ type: "required", message: "Asesment cannot be blank." },],
    address: [{ type: "required", message: "Address cannot be blank." }],
    country_id: [{ type: "required", message: "Please select Country." }],
    state_id: [{ type: "required", message: "Please select State." }],
    city_id: [{ type: "required", message: "Please select City." }],
    zip_code: [{ type: "required", message: "Zipcode cannot be blank." }],
  };

  async GetChildrenById() {
    if (this.ChildrenId) {
      let res = await this.service.GetAll(`v1/Student/ById/${this.ChildrenId}`);
      if (res) {
        this.ChildrenData = res;
        this.GetStateListByCountryId(this.ChildrenData.country_id);
        this.GetCityListByStateId(this.ChildrenData.state_id);
      }
    }
  }

  async GetCountryList() {
    let res = await this.service.GetAll("v1/Country/List");
    if (res) {
      this.CountryList = res;
    }
  }

  async GetCityListByStateId(id: string) {
    let res = await this.service.GetAll(`v1/City/ByStateId/${id}`);
    if (res) {
      this.CityList = res;
    }
  }


  async GetStateListByCountryId(id: string) {
    let res = await this.service.GetAll(`v1/State/ByCountryId/${id}`);
    if (res) {
      this.StateList = res;
    }
  }



  GetGenderChildrenlist() {
    this.GenderList = [];
    this.GenderList = this.helper.ConvertEnumToArray(GenderEnum);
  }



  async Save() {
    if (this.ChildrenForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.ChildrenData.id) {
        res = await this.service.CommonPut(this.ChildrenData, `v1/Student/Update/${this.ChildrenData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.ChildrenData, "v1/Student/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        let ChildrenId = res.AddtionalData ? res.AddtionalData : this.ChildrenId;
        this.helper.RefreshredirectTo("Children/"+ ChildrenId);
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
      this.helper.validateAllFormFields(this.ChildrenForm);
    }
  }
}

const routes: Routes = [{ path: "", component: ChildrenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class childrenRoutingModule { }

@NgModule({
  declarations: [ChildrenComponent],
  imports: [
    CommonModule,
    childrenRoutingModule,
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
  ],
})
export class childrenModule { }
