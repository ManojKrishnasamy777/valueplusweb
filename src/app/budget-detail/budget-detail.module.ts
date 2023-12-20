import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetDetailRoutingModule } from './budget-detail-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { BudgetDetailPage } from './budget-detail.page';
import { RouterLink } from '@angular/router';
import { DatePickerModule } from '../shared/date-picker/date-picker.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        DatePickerModule,
        BudgetDetailRoutingModule
    ],
    declarations: [BudgetDetailPage]
})
export class BudgetDetailModule { }
