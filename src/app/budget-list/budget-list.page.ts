import { DocumentViewerOptions } from './../../../node_modules/@awesome-cordova-plugins/document-viewer/ngx/index.d';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkboxOutline, closeCircleOutline, closeOutline } from 'ionicons/icons';
import { Platform, ValueAccessor } from '@ionic/angular/common';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { CommonHelperService } from 'src/app/Helper/common-helper.service';
import { CommonService } from 'src/app/Service/common.service';
import { CommonHelper } from '../Helper/CommonHelper';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.page.html',
  styleUrls: ['./budget-list.page.scss'],
})
export class BudgetListPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  commentsFc = new FormControl('');
  isModalOpen: boolean = false;
  type: string = '';
  Status: string = '';
  //@ts-ignore
  CommendForm: FormGroup;
  budgetList: any = [];
  budgetPidList: any = [];
  TypeName: string = '';
  UserId: number = 0;
  ApprovData: any = {};
  approvalStatus: string = '';
  constructor(
    private route: ActivatedRoute,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    public platform: Platform,
    private nativeHTTP: HTTP,
    private filesave: File,
    private fb: FormBuilder,
    private httpService: CommonService,
    private helper: CommonHelperService,
    private commonHelper: CommonHelper
  ) {
    addIcons({ checkboxOutline, closeCircleOutline, closeOutline });
  }

  async ngOnInit() {
    debugger
    this.UserId = this.route.snapshot.params["userid"];
    this.TypeName = this.route.snapshot.params["typename"];
    await this.ApprovalList(this.TypeName, this.UserId);
  }

  async openAppOrRejModal(id: number) {
    debugger
    this.CommendForm = this.fb.group({
      approvalStatus: ['', [Validators.required,]],
      approvalComments: ['', [Validators.required,]]
    });
    if (this.UserId) {
      let res = await this.httpService.GetById(id, "v1/Approval/ApprovalById");
      this.ApprovData = res
    }
    this.isModalOpen = true;
  }

  appOrRejItem() {
    if (this.CommendForm.invalid) {
      this.CommendForm.markAllAsTouched();
      return;
    }
  }

  get fc() {
    return this.CommendForm.controls;
  }

  async openPDF() {
    debugger
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

  handleRefresh(event: any) {
    setTimeout(async () => {
      event.target.complete();
    }, 2000);
  }

  async ApprovalList(typename: string, userId: number) {
    debugger
    typename = this.TypeName;
    userId = this.UserId
    let res = await this.httpService.GetAll(`v1/Approval/ApprovalList?typename=${typename}&userId=${userId}`);
    if (res) {
      this.budgetList = res;
    }
  }

  async Approval() {
    debugger
    if (this.CommendForm.valid == true) {
      let res: any;
      let SaveData: any = {}
      SaveData['approvalStatus'] = this.ApprovData.approvalStatus;
      SaveData['approvalComments'] = this.ApprovData.approvalComments;
      await this.ApprovalList(this.TypeName, this.UserId);
      this.helper.presentSuccessToast('Submitted Successfully');
      this.isModalOpen = false;
      if (this.ApprovData) {
        res = await this.httpService.CommonPut(SaveData, `v1/Approval/ApprovalUpdate/${this.ApprovData.pId}`);
      }
    }
    else {
      this.commonHelper.validateAllFormFields(this.CommendForm);
    }
  }


}
