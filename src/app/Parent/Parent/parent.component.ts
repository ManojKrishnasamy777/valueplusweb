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
import { GenderEnum } from 'src/Helper/Enum/GenderEnum';
import { RelationshipEnum } from 'src/Helper/Enum/RelationShipEnum';
import { ParentModel } from 'src/Model/Parent.model';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
})
export class parentComponent implements OnInit {
    parentlist: any = [];
    ParentId: string;
    parentForm: FormGroup;
    parentRoledropdown: any = [];
    ParentData: ParentModel = new ParentModel();
    GenderDropdownList: any = [];
    CountryList: any = [];
    StateList: any = [];
    CityList: any = [];
    RelationshipList: any = [];
    Childrenlist: any = [];
    gender: any;
    SelectedChildId: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private formbuilder: FormBuilder,
        private route: ActivatedRoute,
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        this.ParentId = this.route.snapshot.params["id"];
        this.parentForm = this.formbuilder.group({
            first_name: new FormControl('', Validators.compose([Validators.required])),
            last_name: new FormControl('', Validators.compose([Validators.nullValidator])),
            gender: new FormControl('', Validators.compose([Validators.required])),
            relation_ship_type: new FormControl('', Validators.compose([Validators.required])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"), Validators.pattern("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$")])),
            mobile: new FormControl('', Validators.compose([Validators.required])),
            address: new FormControl('', Validators.compose([Validators.required])),
            country_id: new FormControl('', Validators.compose([Validators.required])),
            state_id: new FormControl('', Validators.compose([Validators.required])),
            city_id: new FormControl('', Validators.compose([Validators.required])),
            zip_code: new FormControl('', Validators.compose([Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        })
        this.ParentId = this.route.snapshot.params["id"];
        this.GetGenderDropdownList();
        this.GetRelationShip();
        await this.GetCountryList();
        await this.GetChildList();
        await this.GetParentById();
        this.helper.HideSpinner();
    }
    GetParentData() {
        throw new Error('Method not implemented.');
    }

    parentValidationMessages = {
        'first_name': [{ type: 'required', message: 'First Name cannot be blank.' },],
        'gender': [{ type: 'required', message: 'Please select Gender.' },],
        'relation_ship_type': [{ type: 'required', message: 'Please select Relationship.' },],
        'email': [{ type: 'required', message: 'Required .' }, { type: 'pattern', message: 'Invalid email' }],
        'mobile': [{ type: 'required', message: 'Mobile cannot be blank.' },],
        'address': [{ type: 'required', message: 'Address cannot be blank.' },],
        'country_id': [{ type: 'required', message: 'Please select Country.' },],
        'state_id': [{ type: 'required', message: 'Please select State.' },],
        'city_id': [{ type: 'required', message: 'Please select City.' },],
        'zip_code': [{ type: 'required', message: 'Zipcode cannot be blank.' },],
        'password': [{ type: 'required', message: 'Required.' }, { type: 'minlength', message: 'At least 6 characters, but longer is better.' }],
    };

    async GetParentById() {
        if (this.ParentId) {
            let res = await this.service.GetAll(`v1/Parent/ById/${this.ParentId}`);
            if (res) {
                this.ParentData = res;
                let password = this.parentForm.get("password");
                password.setValidators([Validators.nullValidator]);
                password.updateValueAndValidity();
                await this.GetParentByChid();
                await this.GetStateListByCountryId(this.ParentData.country_id);
                await this.GetCityListByStateId(this.ParentData.state_id);
            }
            else {
                this.ParentData = new ParentModel();
            }
        }
    }

    GetGenderDropdownList() {
        this.GenderDropdownList = [];
        this.GenderDropdownList = this.helper.ConvertEnumToArray(GenderEnum);
    }

    GetRelationShip() {
        this.RelationshipList = [];
        this.RelationshipList = this.helper.ConvertEnumToArray(RelationshipEnum);
    }



    async GetCountryList() {
        let res = await this.service.GetAll("v1/Country/List");
        if (res) {
            this.CountryList = res;
        }
    }

    async GetStateListByCountryId(id: string) {
        let res = await this.service.GetAll(`v1/State/ByCountryId/${id}`);
        if (res) {
            this.StateList = res;
        }
    }


    async GetCityListByStateId(id: string) {
        let res = await this.service.GetAll(`v1/City/ByStateId/${id}`);
        if (res) {
            this.CityList = res;
        }
    }

    async GetChildList() {
        let res = await this.service.GetAll(`v1/Student/List`);
        if (res) {
            this.Childrenlist = res;
        }
    }

    async Save() {
        if (this.SelectedChildId.length == 0) {
            return this.helper.ErrorToastr('Select a Child');
        }
        if (this.parentForm.valid == true) {
            this.helper.ShowSpinner();
            let res: any;
            if (this.ParentId != '0') {
                res = await this.service.CommonPut(this.ParentData, `v1/Parent/Update/${this.ParentData.id}`);
            }
            else {
                res = await this.service.CommonPost(this.ParentData, "v1/ParentRegistration/ParentRegistration");
            }
            if (res.Type == "S") {
                let ParentId = res.AddtionalData ? res.AddtionalData : this.ParentId;
                await this.ParentChildMapping(ParentId);
                this.helper.SucessToastr(res.Message);
                this.helper.RefreshredirectTo("Parent/" + ParentId);
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
            this.helper.validateAllFormFields(this.parentForm);
        }
    }


    SelectedChildChangeEvent(value: any, is_edit: boolean) {
        if (is_edit) {

        }
        else {

        }
    }

    async GetParentByChid() {
        let res = await this.service.GetAll(`v1/ParentStudentMapping/ByParentId/${this.ParentId}`);
        if (res) {
            this.SelectedChildId = res.map(o => o.student_id);
        }
    }



    async ParentChildMapping(ParentId: string) {
        let res: any;
        this.helper.ShowSpinner();
        if (this.SelectedChildId.length > 0) {
            let data: any = [];
            data = this.SelectedChildId.map(o => ({
                parent_id: ParentId,
                student_id: o
            }));
            let saveData: any = [];
            saveData['parent_student_details'] = data;
            res = await this.service.CommonPost(saveData, "v1/ParentStudentMapping/InsertOrUpdate");
            if (res.Type == "S") {
                // this.GetChildList();
            }
            else if (res.Type == "W") {
                this.helper.WarningToastr(res.Message);
            }
            else {
                this.helper.ErrorToastr(res.Message);
            }
        }
        else {
            this.helper.ErrorToastr('Select a Student');
        }
        this.helper.HideSpinner();
    }

    ClearSeletectedChilds() {
        this.SelectedChildId = [];
    }



}

const routes: Routes = [
    { path: "", component: parentComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class parentRoutingModule { }

@NgModule({
    declarations: [parentComponent],
    imports: [
        CommonModule,
        parentRoutingModule,
        ModuleData,
        DropdownModule,
        ConfirmDialogModule,
        TableModule,
        CheckboxModule,
        ButtonModule,
        PasswordModule,
        CardModule,
        InputSwitchModule,
        TabViewModule,
        StateModule,
        CityModule,
        FileUploadModule,
        CalendarModule,
        MultiSelectModule
    ],
})
export class parentModule { }
