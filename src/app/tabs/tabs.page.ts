import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonHelperService } from 'src/app/Helper/common-helper.service';
import { ActionSheetController, IonicModule, RefresherEventDetail } from '@ionic/angular';
import { CommonHelper } from '../Helper/CommonHelper';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('logoutAlert')
  alert!: HTMLIonAlertElement;
  handlerMessage = '';
  roleMessage = '';
  public alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      // cssClass: 'text-danger',
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Yes',
      role: 'confirm',
      // cssClass: 'text-success',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];
  appVersion: String = '3.0.1';
  constructor(
    private router: Router,
    private helper: CommonHelperService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private commonhelper: CommonHelper,


  ) { }
  

  ngOnInit() { }

  ionViewWillEnter() { }

  async presentLogoutAlert() {
    console.log(this.router.url)
    await this.alert.present();
    this.alert.onDidDismiss().then((ev) => {
      if (ev.role == 'confirm') {
        this.logout();
      }
    });
  }

  async logout() {
    this.helper.logout();
    // window.localStorage.clear();
    // this.router.navigate(['/login', {skipLocationChange: true}]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Profile',

          icon: 'person-outline' ,
          handler: () => {
            this.commonhelper.redirectTo("/profile")
          },
          cssClass: 'custom',
        },
        {
          text: 'Change Password',
          icon: 'lock-open-outline',
          handler: () => {
            this.commonhelper.redirectTo("/changepassword")
          },
          cssClass: 'custom-action-sheet-icon',
        },
        {
          text: 'Log Out',
          icon: 'log-out-outline',
          handler: () => {
            console.log(this.router.url)
             this.alert.present();
            this.alert.onDidDismiss().then((ev) => {
              if (ev.role == 'confirm') {
                this.logout();
              }
            });
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
