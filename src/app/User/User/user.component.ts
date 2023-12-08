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
import { UserModel } from 'src/Model/User.model';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
    userlist: any = [];
    UserId: number = 0;
    UserData: UserModel = new UserModel();
    UserForm: FormGroup;
    UserRoledropdown: any = [];
    SelectedBranchData: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        this.UserId = this.route.snapshot.params["id"];
        if (this.UserId != 0) {
            this.UserForm = this.formbuilder.group({
                user_role_id: new FormControl('', Validators.compose([Validators.required])),
                email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
                mobile: new FormControl('', Validators.compose([Validators.nullValidator])),
                first_name: new FormControl('', Validators.compose([Validators.required])),
                last_name: new FormControl('', Validators.compose([Validators.nullValidator])),
            })
        }
        else {
            this.UserForm = this.formbuilder.group({
                user_role_id: new FormControl('', Validators.compose([Validators.required])),
                email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
                password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
                mobile: new FormControl('', Validators.compose([Validators.nullValidator])),
                first_name: new FormControl('', Validators.compose([Validators.required])),
                last_name: new FormControl('', Validators.compose([Validators.nullValidator])),
            })
        }
        await this.UserById();
        await this.UserRoledropdownList();
        this.helper.HideSpinner();
    }

    UserValidationMessages = {
        'user_role_id': [{ type: 'required', message: 'Please select user role.' },],
        'email': [{ type: 'required', message: 'Required.' }, { type: 'pattern', message: 'Invalid email' }],
        'password': [{ type: 'required', message: 'Required.' }, { type: 'minlength', message: 'At least 6 characters, but longer is better.' }],
        'first_name': [{ type: 'required', message: 'First Name cannot be blank.' },],
    };

    async UserById() {
        debugger
        if (this.UserId != 0) {
            this.UserData = await this.service.GetAll(`v1/User/ById/${this.UserId}`);
        }
    }

    async UserRoledropdownList() {
        let res = await this.service.GetAll("v1/UserRole/List");
        this.UserRoledropdown = res;
        this.UserRoledropdown.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        if (this.UserId == 0) {
            this.UserData.user_role_id = this.UserRoledropdown[0]?.id;
        }
    }

    async SaveUser() {
        if (this.UserForm.valid == true) {
            this.helper.ShowSpinner();
            let res: any;
            if (this.UserData.id) {
                res = await this.service.CommonPut(this.UserData, `v1/User/Update/${this.UserData.id}`);
            }
            else {
                res = await this.service.CommonPost(this.UserData, "v1/User/Insert");
            }
            if (res.Type == "S") {
                this.helper.SucessToastr(res.Message);
                this.helper.redirectTo("UserList");
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
            this.helper.validateAllFormFields(this.UserForm);
        }
    }

    async Usersuspendoractive() {
        this.confirmationService.confirm({
            message: (this.UserData.status === true ? "Are you sure you want to suspend ?" : "Are you sure you want to activate ?"),
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                this.helper.ShowSpinner();
                const res = await this.service.CommonPatch({}, "v1/User/SuspendOrActivate/" + this.UserData.id);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.helper.redirectTo("UserList");
                }
                else {
                    this.helper.ErrorToastr(res.message);
                }
                this.helper.HideSpinner();
            }
        });
    }
}

const routes: Routes = [
    { path: "", component: UserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }

@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ModuleData,
        DropdownModule,
        ConfirmDialogModule,
        TableModule,
        CheckboxModule,
        ButtonModule,
        PasswordModule,
        CardModule,
        InputSwitchModule
    ],
})
export class UserModule { }
