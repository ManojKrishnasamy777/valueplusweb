import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileRoutingModule } from './profile-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { ProfilePage } from './profile.page';
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
        ProfileRoutingModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class ProfileModule { }
