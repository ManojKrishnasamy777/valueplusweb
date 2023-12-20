import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonHelper } from '../Helper/CommonHelper';
import { CommonService } from '../Service/common.service';
import { CommonHelperService } from '../Helper/common-helper.service';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  styles: [
    `ion-content::part(scroll) {
      display: grid;
      align-items: center;
      justify-content: center;
    }`
  ]
})
export class changepasswordPage implements OnInit {
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


  password!: string;
  confirm_password!: string;
  old_password!: string;

  changepasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    old_password: ['', [Validators.required, Validators.minLength(6)]],
  });


  constructor(
    private fb: FormBuilder,
    private helper: CommonHelper,
    private services: CommonService,
    private commonhelper: CommonHelperService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
  ) { }

  async ngOnInit() {
    const loading: HTMLIonLoadingElement = await this.commonhelper.showSpinner();

    loading.dismiss();
  }



  get fc() {
    return this.changepasswordForm.controls;
  }
  async ChangePassword() {
    const loading: HTMLIonLoadingElement = await this.commonhelper.showSpinner();
    if (this.changepasswordForm.valid == true) {
      let res: any = {};
      if (this.changepasswordForm.value.password == this.changepasswordForm.value.confirm_password) {
        res = await this.services.CommonPost(this.changepasswordForm.value, "ChangePassword");
        if (res.Type == "S") {
          this.commonhelper.presentSuccessToast(res.Message);
          this.helper.DeleteAllLocalStorage();
          this.helper.redirectTo("login");
          loading.dismiss();

        } else {
          this.commonhelper.presentErrorToast(res.Message);
        }
        loading.dismiss();
      }
      else {
        this.commonhelper.presentErrorToast("New password and confirm password does not match");
      }
      loading.dismiss();
    } else {
      this.helper.validateAllFormFields(this.changepasswordForm);
    }
    loading.dismiss();

  }

  togglePasswordVisibility(eve: MouseEvent) {
    const btn = eve.target as HTMLIonButtonElement;
    const icon = btn.firstElementChild as HTMLIonIconElement;
    const ip = btn.previousElementSibling as HTMLIonInputElement;
    ip.type = ip.type == 'password' ? 'text' : 'password';
    icon.name = ip.type == 'password' ? 'eye-outline' : 'eye-off-outline';
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Profile',
          icon: 'person-outline',
          handler: () => {
            this.helper.redirectTo("/profile")
          },
        },
        {
          text: 'Change Password',
          icon: 'lock-open-outline',
          handler: () => {
            this.helper.redirectTo("/changepassword")
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

  async logout() {
    const loading: HTMLIonLoadingElement = await this.commonhelper.showSpinner();
     this.helper.DeleteAllLocalStorage();
     this.helper.redirectTo("login");
     loading.dismiss();

    }}
