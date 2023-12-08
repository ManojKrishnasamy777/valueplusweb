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
    selector: 'app-parentlist',
    templateUrl: './parentlist.component.html',
})

export class ParentListComponent implements OnInit {
    Parentlist: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.Getparentlist();
        this.helper.HideSpinner();
    }

    async Getparentlist() {
        debugger
        let res = await this.service.GetAll("v1/Parent/List");
        if (res) {
            this.Parentlist = res;
        }
    }

    async Editparent(id: string) {
        this.helper.redirectTo("/Parent/" + id);
    }

    async Deleteparent(id: number, event, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this employee- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/parent/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.Getparentlist();
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
    { path: "", component: ParentListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParentListRoutingModule { }

@NgModule({
    declarations: [ParentListComponent],
    imports: [
        CommonModule,
        ParentListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule
    ],
})
export class ParentListModule { }