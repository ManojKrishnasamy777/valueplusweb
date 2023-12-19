import { Component, EnvironmentInjector, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonRefresher, IonRefresherContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActionSheetController, IonicModule, RefresherEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  constructor(
    private router: Router,

  ) {
    addIcons({ arrowForwardOutline });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  ionViewWillEnter() {
    // alert('ionViewWillEnter');
  }

  ionViewDidEnter() {
    // alert('ionViewDidEnter');
  }


  redirect() {
    this.router.navigate(['/booking'], { replaceUrl: true });
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
