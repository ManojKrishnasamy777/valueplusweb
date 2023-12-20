
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonHelperService } from '../Helper/common-helper.service';
import { CommonHelper } from '../Helper/CommonHelper';
import { CommonService } from '../Service/common.service';
import { ActionSheetController, IonicModule } from '@ionic/angular';

// import { Http } from '@capacitor-community/http';
// import { CapacitorHttp, HttpResponse } from '@capacitor/core';
// import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  styles: [
    `ion-content::part(scroll) {
      display: grid;
      align-items: center;
      justify-content: center;
    }`
  ]
})
export class profilePage implements OnInit {
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

  countList: any = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonhelper : CommonHelper,
    private helper: CommonHelperService,
    private httpService: CommonService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.helper.showSpinner();
   await this.GetProfileList();
   loading.dismiss();

  }

  async GetProfileList() {
    let Userdata = this.helper.GetUserInfo();
    let res = await this.httpService.GetAll("UserProfile");
    if (res) {
      this.countList = res;
    }
  }

  async logout() {
    const loading: HTMLIonLoadingElement = await this.commonhelper.ShowSpinner();
     this.commonhelper.DeleteAllLocalStorage();
     this.commonhelper.redirectTo("login");
     loading.dismiss();

    }
    async presentActionSheet() {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Actions',
        buttons: [
          {
            text: 'Profile',
            icon: 'person-outline',
            handler: () => {
              this.commonhelper.redirectTo("/profile")
            },
          },
          {
            text: 'Change Password',
            icon: 'lock-open-outline',
            handler: () => {
              this.commonhelper.redirectTo("/changepassword")
            },
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

