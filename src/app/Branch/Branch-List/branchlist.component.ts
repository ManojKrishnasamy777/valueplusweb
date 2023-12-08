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
@Component({
    selector: 'app-branchlist',
    templateUrl: './branchlist.component.html',
})

export class BranchListComponent implements OnInit {
    BranchList: any = [];
    

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetBranchList();
        this.helper.HideSpinner();
    }

    async GetBranchList() {
        this.BranchList = await this.service.GetAll("v1/Branch/List");
    }

    async EditBranch(id: string) {
        debugger
        this.helper.redirectTo("/Branch/" + (id));
    }

    async DeleteBranch(id: number, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this Country- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/Branch/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.GetBranchList();
                }
                else {
                    this.helper.ErrorToastr(res.Message);
                }
                this.helper.HideSpinner();
            }
        });
    }
}

const routes: Routes = [
    { path: "", component: BranchListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BranchListRoutingModule { }

@NgModule({
    declarations: [BranchListComponent],
    imports: [
        CommonModule,
        BranchListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule,
    ],
})
export class BranchListModule { }