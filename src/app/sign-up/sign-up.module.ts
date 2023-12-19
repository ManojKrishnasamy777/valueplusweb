import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { SignUpPage } from './sign-up.page';
import { RouterLink } from '@angular/router';

@NgModule({
    imports: [
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        FormsModule,
        RouterLink,
        IonContent,
        IonIcon,
        SignUpRoutingModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class SignUpModule { }
