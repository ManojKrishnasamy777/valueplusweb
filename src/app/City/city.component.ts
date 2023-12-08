import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CountryModel } from 'src/Model/Country.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CityModel } from 'src/Model/City.model';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
})

export class CityComponent implements OnInit {
  CityForm: FormGroup;
  CityData: CityModel = new CityModel();
  CityList: any = [];
  CityDialog: boolean = false;
  StateList: any = [];

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.helper.ShowSpinner();
    await this.GetCityList();
    this.helper.HideSpinner();
  }

  CityValidationMessage = {
    'name': [{ type: 'required', message: 'Name cannot be blank.' },],
    'code': [{ type: 'required', message: 'Code cannot be blank.' },],
    'state_id': [{ type: 'required', message: 'Please select State.' },],
  };

  async GetCityList() {
    debugger
    let res = await this.service.GetAll("v1/City/List");
    if (res) {
      this.CityList = res;
    }
  }

  async GetStateList() {
    let res = await this.service.GetAll("v1/State/List");
    if (res) {
      this.StateList = res;
    }
  }

  async CreateCity(id: number) {
    debugger
    this.CityForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([Validators.required])),
      state_id: new FormControl('', Validators.compose([Validators.required]))
    });
    if (id) {
      this.helper.ShowSpinner();
      let res = await this.service.GetById(id, "v1/city/ById");
      this.CityData = res;
      this.helper.HideSpinner();
    }
    else {
      this.CityData = new CityModel();
    }
    await this.GetStateList();
    this.CityDialog = true;
  }


  async Save() {
    debugger
    if (this.CityForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.CityData.id) {
        res = await this.service.CommonPut(this.CityData, `v1/City/Update/${this.CityData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.CityData, "v1/City/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        await this.GetCityList();
        this.CityDialog = false;
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
      this.helper.validateAllFormFields(this.CityForm);
    }
  }


  async Delete(id: number, name: string) {
    debugger
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure, that you want to delete this City- ' + name + '?',
      icon: 'pi pi-question-circle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(`v1/City/Delete/${id}`);
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message);
          this.GetCityList();
        }
        else {
          this.helper.ErrorToastr(res.Message);
        }
        this.helper.HideSpinner();
      }
    });
  }


  CloseDialouge() {
    this.CityDialog = false;
  }

}

const routes: Routes = [
  { path: "", component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }

@NgModule({
  declarations: [CityComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    ModuleData,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [CityComponent],
})
export class CityModule { }
