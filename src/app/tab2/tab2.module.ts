import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2RoutingModule } from './tab2-routing.module';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Tab2Page } from './tab2.page';
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
        Tab2RoutingModule,
        ReactiveFormsModule
    ],
    declarations: []
})
export class Tab2Module { }
