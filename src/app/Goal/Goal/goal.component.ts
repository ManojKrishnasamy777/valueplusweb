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
import { DateFormat } from 'src/Helper/DateFormat';
import { GoalModel } from 'src/Model/Goal.model';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
})
export class GoalComponent implements OnInit {
  GoalId: any = 0;
  GoalForm: FormGroup;
  GoalData: GoalModel = new GoalModel();
  GoalQualificationData: any = [];
  ActivityDialog: boolean;
  GoalActivityForm: FormGroup;
  ActivityList: any = [];
  ActivityData: any = {};

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) { }

  async ngOnInit() {
    this.GoalId = this.route.snapshot.params["id"];

    this.helper.ShowSpinner();
    this.GoalForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
    });

    await this.GetGoalById();
    await this.GetActivityList();
    this.helper.HideSpinner();
  }

  GoalValidationMessages = {
    'name': [{ type: 'required', message: 'Please select Name.' },],


  };

  ActivityValidationMessages = {
    'activity_name': [{ type: 'required', message: 'Activity cannot be blank.' },],
  };

  async GetGoalById() {
    debugger
    if (this.GoalId != 0) {
      let res = await this.service.GetAll(`v1/Goal/ById/${this.GoalId}`);
      if (res) {
        this.GoalData = res;
      }
    }
  }


  async AddnewActivity(id: string) {
    this.helper.ShowSpinner();
    this.GoalActivityForm = this.formbuilder.group({
      activity_name: new FormControl('', Validators.compose([Validators.required])),
    })
    if (id != '0') {
      let res = await this.service.GetAll(`v1/Activity/ById/${id}`);
      if (res) {
        this.ActivityData = res;
      }
    }
    else {
      this.ActivityData = {};
    }
    this.ActivityDialog = true;
    this.helper.HideSpinner();
  }

  CloseDialouge() {
    this.ActivityDialog = false;
  }


  async GetActivityList() {
    let res = await this.service.GetAll(`v1/Activity/ByGoalId/${this.GoalId}`);
    if (res) {
      this.ActivityList = res;
    }
  }

  async Save() {
    debugger
    if (this.GoalForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      if (this.GoalId != 0) {
        res = await this.service.CommonPut(this.GoalData, `v1/Goal/Update/${this.GoalData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.GoalData, "v1/Goal/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        let id = res.AddtionalData ? res.AddtionalData : this.GoalId;
        this.helper.RefreshredirectTo("Goal/" + id);
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
      this.helper.validateAllFormFields(this.GoalForm);
      this.helper.HideSpinner();
    }
  }

  async SaveGoalActivity() {
    debugger
    if (this.GoalActivityForm.valid == true) {
      this.helper.ShowSpinner();
      let res: any;
      this.ActivityData.goal_id = this.GoalId;
      if (this.ActivityData.id) {
        res = await this.service.CommonPut(this.ActivityData, `v1/Activity/Update/${this.ActivityData.id}`);
      }
      else {
        res = await this.service.CommonPost(this.ActivityData, "v1/Activity/Insert");
      }
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message);
        await this.GetActivityList()
        this.ActivityDialog = false;
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
      this.helper.validateAllFormFields(this.GoalActivityForm);
      this.helper.HideSpinner();
    }
  }

}

const routes: Routes = [
  { path: "", component: GoalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalRoutingModule { }

@NgModule({
  declarations: [GoalComponent],
  imports: [
    CommonModule,
    GoalRoutingModule,
    ModuleData,
    ConfirmDialogModule,
    TableModule,
    CardModule,
    InputSwitchModule,
    TabViewModule,
    DialogModule,
    InputTextModule
  ],
})
export class GoalModule { }


