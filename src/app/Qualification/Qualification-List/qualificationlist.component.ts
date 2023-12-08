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
    selector: 'app-qualificationList',
    templateUrl: './qualificationlist.component.html',
})

export class QualificationListComponent implements OnInit {
    QualificationList: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetQualificationList();
        this.helper.HideSpinner();
    }


    async GetQualificationList() {
        let res = await this.service.GetAll("v1/Qualification/List");
        if (res) {
            this.QualificationList = res
        }
    }

    async EditQualification(id: string) {
        debugger
        this.helper.redirectTo("/Qualification/" + id);
    }

    async DeleteQualification(id: number, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this Qualification- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/Qualification/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.GetQualificationList();
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
    { path: "", component: QualificationListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QualificationListRoutingModule { }

@NgModule({
    declarations: [QualificationListComponent],
    imports: [
        CommonModule,
        QualificationListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule
    ],
})
export class QualificationListModule { }