import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { SignUpPage } from './sign-up.page';
import { RouterLink } from '@angular/router';
import { DatePickerModule } from '../shared/date-picker/date-picker.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SignUpRoutingModule,
        ReactiveFormsModule,
        DatePickerModule
    ],
    declarations: [SignUpPage]
})
export class SignUpModule { }
