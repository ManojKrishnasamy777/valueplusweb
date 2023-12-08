import { Component, OnInit, NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/Model/User.model';


@Component({
    selector: 'app-employeelist',
    templateUrl: './employeelist.component.html',
})

export class EmployeeListComponent implements OnInit {
    EmployeeList: any = [];
    EmployeeasUserlDialog: boolean;
    EmployeeUserForm: FormGroup;
    EmployeeUserData: UserModel = new UserModel();

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService,
        private formbuilder: FormBuilder,

    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetemployeeList();
        this.helper.HideSpinner();
    }

    EmployeeValidationMessages = {
        'email': [{ type: 'required', message: 'Please Email Id' },],
        'password': [{ type: 'required', message: 'Please Enter Password' },],
    };

    async GetemployeeList() {
        let res = await this.service.GetAll("v1/Employee/List");
        if (res) {
            this.EmployeeList = res;
        }
    }

    async Editemployee(id: number) {
        this.helper.redirectTo("/Employee/" + id);
    }

    openAssignEmployee(data: any) {
        this.EmployeeUserForm = this.formbuilder.group({
            email: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required])),
        });
        if (data) {
            this.confirmationService.confirm({
                target: event.target,
                message: 'Are you sure, that you want to assign this employee as user - ' + data.first_name + ' ' + data.last_name + '?',
                icon: 'pi pi-question-circle',
                accept: async () => {
                    this.EmployeeUserData.employee_id = data.id;
                    this.EmployeeUserData.email = data.email;
                    this.EmployeeUserData.first_name = data.first_name;
                    this.EmployeeUserData.last_name = data.last_name;
                    this.EmployeeasUserlDialog = true;
                }
            });
        } else {
            this.EmployeeUserData = new UserModel();
            this.EmployeeasUserlDialog = true;
        }
    }

    async AssignEmployeeUser() {
        debugger
        if (this.EmployeeUserForm.valid == true) {
            this.helper.ShowSpinner();
            let res: any;
            if (this.EmployeeUserData.employee_id) {
                res = await this.service.CommonPut(this.EmployeeUserData, `v1/Employee/EmployeeAsUser/${this.EmployeeUserData.employee_id}`);
            }
            if (res.Type == "S") {
                this.EmployeeasUserlDialog = false;
                this.helper.SucessToastr(res.Message);
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
            this.helper.validateAllFormFields(this.EmployeeUserForm);
            this.helper.HideSpinner();
        }
    }

    async Deleteemployee(id: number, event, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this employee- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/employee/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.GetemployeeList();
                }
                else {
                    this.helper.ErrorToastr(res.Message);
                }
                this.helper.HideSpinner();
            }
        });
    }

    CloseDialouge() {
        this.EmployeeasUserlDialog = false;
    }


}

const routes: Routes = [
    { path: "", component: EmployeeListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeListRoutingModule { }

@NgModule({
    declarations: [EmployeeListComponent],
    imports: [
        CommonModule,
        EmployeeListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        PasswordModule,


    ],
})
export class EmployeeListModule { }