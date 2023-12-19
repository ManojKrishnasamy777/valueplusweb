import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonRefresher, IonRefresherContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterLink,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonAvatar,
        IonContent,
        IonButton,
        IonBackButton,
        IonButtons,
        IonRefresher,
        IonRefresherContent,
        IonAccordionGroup,
        IonAccordion,
        IonItem,
        IonLabel
    ],


})
export class DashboardModule { }
