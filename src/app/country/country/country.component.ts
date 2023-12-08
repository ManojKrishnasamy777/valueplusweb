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
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";
import { StateComponent, StateModule } from "src/app/state/state.component";
import { CityModule } from "../../City/city.component";
import { CountryModel } from 'src/Model/Country.model';
import { StateModel } from "src/Model/State.model";
import { DialogModule } from "primeng/dialog";

@Component({
  selector: "app-country",
  templateUrl: "./country.component.html",
})
export class CountryComponent implements OnInit {
  CountryForm: FormGroup;
  CountryData: CountryModel = new CountryModel();
  CityList: any = [];
  StateList: any = [];
  BranchList: any = [];
  CountryId: any = 0;


  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.CountryForm = this.formbuilder.group({
      name: new FormControl("", Validators.compose([Validators.required])),
      code: new FormControl("", Validators.compose([Validators.required])),
    });
    this.helper.ShowSpinner();
    this.CountryId = this.route.snapshot.params["id"];
    await this.GetCountryData();
    this.helper.HideSpinner();
  }

  CountryValidationMessage = {
    name: [{ type: "required", message: "Name cannot be blank." }],
    code: [{ type: "required", message: "Code cannot be blank." }],
  };

  async GetCountryData() {
    debugger;
    if (this.CountryId != 0) {
      let res = await this.service.GetAll(`v1/Country/ById/${this.CountryId}`);
      if (res) {
        this.CountryData = res
      }
    }
  }

  async EditBranch(id: string) {
    this.helper.redirectTo("/Branch/" + this.helper.Encrypt(id));
  }

  async Save() {
    debugger
    if (this.CountryForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.CountryId != 0) {
        res = await this.service.CommonPut(this.CountryData, `v1/Country/Update/${this.CountryData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.CountryData, "v1/Country/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        this.helper.redirectTo("Country");
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
      this.helper.validateAllFormFields(this.CountryForm);
    }
  }


  EditCountry(id: any) {
    this.helper.redirectTo("country");
  }

}

const routes: Routes = [{ path: "", component: CountryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule { }

@NgModule({
  declarations: [CountryComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ModuleData,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    StateModule,
    CityModule,
    DropdownModule,
    DialogModule
  ]
})
export class CountrytModule { }
