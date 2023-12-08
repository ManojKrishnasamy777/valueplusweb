import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { UserRoleModel } from 'src/Model/UserRole.model';
import { ButtonModule } from 'primeng/button';
import { DegreeEnum } from 'src/Helper/Enum/DegreeEnum';
import { QualificationModel } from 'src/Model/Qualification.model';

@Component({
    selector: 'app-qualification',
    templateUrl: './qualification.component.html',
})
export class QualificatioComponent implements OnInit {

    QualificationData: QualificationModel = new QualificationModel();
    QualificationForm: FormGroup;
    QualificationId: any = '';
    QualificationDialog: boolean = false;
    QualificationList: any = [];
    DegreeList: any = [];


    constructor(
        private service: CommonService,
        public helper: CommonHelper,
        private route: ActivatedRoute,
        public commonservice: CommonService,
        private formbuilder: FormBuilder
    ) { }

    async ngOnInit() {
        this.QualificationId = this.route.snapshot.params["id"];
        this.QualificationForm = this.formbuilder.group({
            degree: new FormControl('', Validators.compose([Validators.required])),
            specialization: new FormControl('', Validators.compose([Validators.required]))
        });
        await this.GetQualificationData();
        this.GetDegreeList();
        this.helper.HideSpinner();
    }

    QualificationValidationMessages = {
        'degree': [{ type: 'required', message: 'Please select Degree.' },],
        'specialization': [{ type: 'required', message: 'specialization cannot be blank.' },]
    };

    async QualificationDropdownList() {
        let res = await this.service.GetAll("v1/Qualification/List");
        if (res) {
            this.QualificationList = res;
        }
    }


    async GetQualificationData() {
        debugger
        this.helper.ShowSpinner();
        if (this.QualificationId != 0) {
            this.QualificationData = await this.service.GetById(this.QualificationId, "v1/Qualification/ById");
        }
        else {
            this.QualificationData = new QualificationModel();
        }
        this.helper.HideSpinner();
    }

    CloseDialouge() {
        this.helper.ShowSpinner();
        this.QualificationDialog = false;
        this.helper.HideSpinner();
    }

    async Save() {
        debugger
        if (this.QualificationForm.valid == true) {
            this.helper.ShowSpinner();
            let res: any;
            if (this.QualificationData.id) {
                res = await this.service.CommonPut(this.QualificationData, `v1/Qualification/Update/${this.QualificationData.id}`);
            }
            else {
                res = await this.service.CommonPost(this.QualificationData, "v1/Qualification/Insert");
            }
            if (res.Type == "S") {
                this.helper.SucessToastr(res.Message);
                let id = res.AddtionalData ? res.AddtionalData : this.QualificationId;
                this.helper.redirectTo("Qualification/" + id);
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
            this.helper.validateAllFormFields(this.QualificationForm);
        }
    }

    GetDegreeList() {
        this.helper.ShowSpinner();
        this.DegreeList = [];
        let res = this.helper.ConvertEnumToArray(DegreeEnum);
        if (res) {
            this.DegreeList = res;
        }
        this.helper.HideSpinner();
    }
}

const routes: Routes = [
    { path: "", component: QualificatioComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QualificationRoutingModule { }

@NgModule({
    declarations: [QualificatioComponent],
    imports: [
        CommonModule,
        QualificationRoutingModule,
        ModuleData,
        DropdownModule,
        TableModule,
        ButtonModule
    ],
})
export class QualificationModule { }