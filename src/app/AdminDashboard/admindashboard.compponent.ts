import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CommonService } from '../../Service/Common.service';
import { CommonHelper } from '../../Helper/CommonHelper';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ModuleData } from 'src/Helper/Modules';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private formbuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    this.helper.ShowSpinner();
    this.helper.HideSpinner();
  }

}

const routes: Routes = [
  { path: "", component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    TabViewModule,
    TableModule,
    DialogModule,
    ModuleData,
    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    PanelModule,
    InputTextModule
  ]
})
export class AdminDashboardModule { }
