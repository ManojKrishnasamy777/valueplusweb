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
    selector: 'app-childrenlist',
    templateUrl: './childrenlist.component.html',
})

export class ChildrenListComponent implements OnInit {
    Childrenlist: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetChildrenlist();
        this.helper.HideSpinner();
    }

    async GetChildrenlist() {
        let res = await this.service.GetAll("v1/Student/List");
        if (res) {
            this.Childrenlist = res;
        }
    }

    async EditChildren(id: string) {
        this.helper.redirectTo("/Children/" + id);
    }

    async DeleteChildren(id: number, event, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this children- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/Student/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.GetChildrenlist();
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
    { path: "", component: ChildrenListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildrenListRoutingModule { }

@NgModule({
    declarations: [ChildrenListComponent],
    imports: [
        CommonModule,
        ChildrenListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule
    ],
})
export class ChildrenListModule { }