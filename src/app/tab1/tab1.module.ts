import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1RoutingModule } from './tab1-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Tab1Page } from './tab1.page';
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
        Tab1RoutingModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class Tab1Module { }
