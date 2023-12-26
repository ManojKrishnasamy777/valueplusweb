import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { checkboxOutline, closeCircleOutline, closeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from 'src/app/Service/common.service';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { CommonHelperService } from '../Helper/common-helper.service';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.page.html',
  styleUrls: ['./budget-detail.page.scss'],
})

export class BudgetDetailPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  commentsFc = new FormControl('');
  TypeName: string = '';
  UserId: number = 0;
  NotificationList: any = [];
  NotificationData: any = {};
  isModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private file: File,
    private nativeHTTP: HTTP,
    private fileOpener: FileOpener,
    private fb: FormBuilder,
    private httpService: CommonService,
    private helper: CommonHelperService,

  ) {
    addIcons({ checkboxOutline, closeCircleOutline, closeOutline });
  }

  async ngOnInit() {
    this.UserId = this.route.snapshot.params["userid"];
    this.TypeName = this.route.snapshot.params["typename"];
    await this.NotificationlList(this.TypeName, this.UserId);
  }

  async NotificationlList(typename: string, userId: number) {
    typename = this.TypeName;
    userId = this.UserId;
    let res = await this.httpService.GetAll(`v1/Notification/NotificationList?typename=${typename}&userId=${userId}`);
    if (res) {
      this.NotificationList = res;
    }
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      event.target.complete();
    }, 2000);
  }

  async openPDF() {
    const filePath = this.file.dataDirectory + 'file-sample_150kB.pdf';
    this.nativeHTTP.downloadFile(`https://www.africau.edu/images/default/sample.pdf`, {},
      {
      },
      filePath).then(response => {
        this.fileOpener.open(response.nativeURL, 'application/pdf')
      }).catch(err => {
        console.log('error block ... ', err.status);
        console.log('error block ... ', err.error);
      })
  }



  async NotificationView(id:number) {
    debugger
    let res: any;
      if (this.NotificationData) {
        res = await this.httpService.CommonPut({},`v1/Notification/NotificationUpdate/${id}`);
          this.helper.presentSuccessToast("Notification Viewed Sucessfully");
          // await this.NotificationlList(this.TypeName, this.UserId);
          this.helper.RefreshredirectTo("/dashboard/");
      }
    
  }

}
