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

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
})

export class StateComponent implements OnInit {
  StateForm: FormGroup;
  StateData: any = {};
  stateList: any = [];
  StateDialog: boolean = false;
  StateId: number = 0;
  CountryList: any = [];

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.helper.ShowSpinner();
    await this.GetStateList();
    await this.GetCountryList();
    this.helper.HideSpinner();
  }

  StateValidationMessage = {
    'name': [{ type: 'required', message: 'Name cannot be blank.' },],
    'code': [{ type: 'required', message: 'Code cannot be blank.' },],
    'country_id': [{ type: 'required', message: 'Please select Country.' },],
  };


  async GetCountryList() {
    this.CountryList = await this.service.GetAll("v1/Country/List");
  }

  async StateById() {
    debugger
    if (this.StateId != 0) {
      this.StateData = await this.service.GetAll(`v1/State/ById/${this.StateId}`);
    }
  }

  async GetStateList() {
    let res = await this.service.GetAll("v1/State/List");
    if (res) {
      this.stateList = res;
    }
  }


  async Save() {
    debugger
    if (this.StateForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.StateData.id) {
        res = await this.service.CommonPut(this.StateData, `v1/State/Update/${this.StateData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.StateData, "v1/State/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        await this.GetStateList();
        this.StateDialog = false;
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
      this.helper.validateAllFormFields(this.StateForm);
    }
  }

  async DeleteState(id: number, name: string) {
    debugger
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure, that you want to delete this State- ' + name + '?',
      icon: 'pi pi-question-circle',
      accept: async () => {
        this.helper.ShowSpinner();
        let res = await this.service.Delete(`v1/State/Delete/${id}`);
        if (res.Type == "S") {
          this.helper.SucessToastr(res.Message);
          this.GetStateList();
        }
        else {
          this.helper.ErrorToastr(res.Message);
        }
        this.helper.HideSpinner();
      }
    });
  }


  async CreateState(id: number) {
    this.StateForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl('', Validators.compose([Validators.required])),
      country_id: new FormControl('', Validators.compose([Validators.required])),
    });
    if (id) {
      this.helper.ShowSpinner();
      let res = await this.service.GetById(id, "v1/state/ById");
      this.StateData = res;
      this.helper.HideSpinner();
    }
    else {
      this.StateData = new StateModule();
    }
    this.StateDialog = true;
  }

  CloseDialouge() {

    this.StateDialog = false;
  }

}

const routes: Routes = [
  { path: "", component: StateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }

@NgModule({
  declarations: [StateComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    ModuleData,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    ButtonModule
  ],
  exports: [StateComponent],
})
export class StateModule { }
