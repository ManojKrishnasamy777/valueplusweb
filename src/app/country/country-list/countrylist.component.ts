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
    selector: 'app-Country',
    templateUrl: './countrylist.component.html',
})

export class CountryListComponent implements OnInit {
    CountryList: any = [];

    constructor(
        public helper: CommonHelper,
        private service: CommonService,
        private confirmationService: ConfirmationService
    ) { }

    async ngOnInit() {
        this.helper.ShowSpinner();
        await this.GetCountryList();
        this.helper.HideSpinner();
    }

    async GetCountryList() {
        this.CountryList = await this.service.GetAll("v1/Country/List");
    }

    async EditCountry(id: string) {
        debugger
        this.helper.redirectTo("/Country/" + (id));
    }

    async DeleteCountry(id: number, name: string) {
        this.confirmationService.confirm({
            target: event.target,
            message: 'Are you sure, that you want to delete this Country- ' + name + '?',
            icon: 'pi pi-question-circle',
            accept: async () => {
                this.helper.ShowSpinner();
                let res = await this.service.Delete(`v1/Country/Delete/${id}`);
                if (res.Type == "S") {
                    this.helper.SucessToastr(res.Message);
                    this.GetCountryList();
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
    { path: "", component: CountryListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CountryListRoutingModule { }

@NgModule({
    declarations: [CountryListComponent],
    imports: [
        CommonModule,
        CountryListRoutingModule,
        ModuleData,
        ConfirmDialogModule,
        TableModule,
        InputTextModule,
        ButtonModule
    ],
})
export class CountryListModule { }