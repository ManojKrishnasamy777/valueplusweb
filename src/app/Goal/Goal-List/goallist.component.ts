import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
@Component({
    selector: 'app-goallist',
    templateUrl: './goallist.component.html',
})

export class GoalListComponent implements OnInit {
    GoalList: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetGoalList();
        this.helper.HideSpinner();
    }

    async GetGoalList() {
        debugger
       let res = await this.service.GetAll("v1/Goal/List");
       if(res){
        this.GoalList = res;
       }
    }

    async Editgoal(id: number) {
        debugger
        this.helper.redirectTo("/Goal/" + id);
    }

   
}

const routes: Routes = [
    { path: "", component: GoalListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoalListRoutingModule { }

@NgModule({
    declarations: [GoalListComponent],
    imports: [
        CommonModule,
        GoalListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        TabViewModule
    ],
})
export class GoalListModule { }