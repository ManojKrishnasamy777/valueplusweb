import { Component, EnvironmentInjector, OnInit, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowForwardOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { IonAvatar, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonRefresher, IonRefresherContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActionSheetController, IonicModule, RefresherEventDetail } from '@ionic/angular';
import { CommonService } from '../Service/common.service';
import { CommonHelperService } from '../Helper/common-helper.service';
import { CommonHelper } from '../Helper/CommonHelper';
import * as _ from 'lodash';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class DashboardPage implements OnInit {
  ApprovalList: any = [];
  NotificationList: any = [];
  ApprovalCount: number = 0;
  NotificationCount: number = 0;
  TotalNoOfRowsApproved: number = 0;
  TotalNoOfRowsNotification: number = 0;
  public environmentInjector = inject(EnvironmentInjector);
  constructor(
    private router: Router,
    private httpService: CommonService,
    private helper: CommonHelperService,
    private commonHelper: CommonHelper

  ) {
    addIcons({ arrowForwardOutline });
  }

  async ngOnInit() {
    await this.GetDashboardList();
  }

  redirect() {
    this.router.navigate(['/booking'], { replaceUrl: true });
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      event.target.complete();
    }, 2000);
  }

  async GetDashboardList() {
    debugger
    let UserData: any = {};
    UserData = this.helper.GetUserInfo();
    console.log(UserData)
    let res = await this.httpService.GetAll(`v1/Dashboard/List?userId=${UserData.userId}`);
    if (res) {
      this.ApprovalList = res.filter((o: { name: string; }) => o.name == 'Approval');
      this.TotalNoOfRowsApproved = _.sumBy(this.ApprovalList, (obj: { noofRows: any; }) => {
        let sum = +(obj.noofRows);
        return _.round(sum, 2);
      });
      this.NotificationList = res.filter((o: { name: string; }) => o.name == 'Notification');
      this.TotalNoOfRowsNotification = _.sumBy(this.NotificationList, (obj: { noofRows: any; }) => {
        let sum = +(obj.noofRows);
        return _.round(sum, 2);
      });
    }
  }

  Budget(TypeName: string) {
    debugger
    let UserData: any = {};
    UserData = this.helper.GetUserInfo();
    TypeName;
    this.commonHelper.redirectTo("/budgetlist/" + UserData.userId + '/' + TypeName);
  }

  NotificationRedirect(TypeName: string) {
    debugger
    let UserData: any = {};
    UserData = this.helper.GetUserInfo();
    TypeName;
    this.commonHelper.redirectTo("/budgetdetail/" + UserData.userId + '/' + TypeName);
  }

}
