import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

import { BudgetListRoutingModule } from './budget-list-routing.module';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { BudgetListPage } from './budget-list.page';
import { RouterLink } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        FormsModule,
        RouterLink,
        IonContent,
        IonIcon,
        IonText,
        IonButton,
        IonModal,
        FormsModule,
        ReactiveFormsModule,
        IonRadio,
        IonRadioGroup,
        IonRefresher,
        IonRefresherContent,
        BudgetListRoutingModule,
    ],
    providers: [
        DocumentViewer,
        FileOpener,
        FileTransfer,
        File,
        HTTP
    ]

})
export class BudgetListModule { }
