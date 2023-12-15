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

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.page.html',
  styleUrls: ['./budget-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    IonText,
    IonButton,
    IonModal,
    FormsModule,
    ReactiveFormsModule,
    IonRadio,
    IonRadioGroup,
    IonRefresher,
    IonRefresherContent
  ],
  providers: [
    DocumentViewer,
    FileOpener,
    FileTransfer,
    File,
    HTTP
  ]
})
export class BudgetListPage implements OnInit, AfterViewInit {
  @ViewChild(IonModal) modal!: IonModal;
  commentsFc = new FormControl('');
  isModalOpen: boolean = false;
  type: string = '';
  Status: string = '';
  //@ts-ignore
  CommendForm: FormGroup;
  budgetList: any[] = [
    {
      "type": "Budget",
      "reqNo": "SampleReqNo2",
      "redDt": "2023-12-02T13:00:00",
      "txnNo": "SampleTxnNo2",
      "reference": "SampleReference2",
      "requisitioner": "SampleRequisitioner2",
      "pdf": "SamplePdf2",
      "approvalStatus": "p",
      "approvalUserId": 123,
      "approvalDt": "2023-12-02T13:30:00",
      "approvalComments": "Approval for process",
      "id": 7,
      "status": false,
      "createdById": 456,
      "createdOn": "2023-12-02T13:45:00",
      "updatedById": 1,
      "updatedOn": "2023-12-02T12:39:02.57"
    },
    {
      "type": "Budget",
      "reqNo": "SampleReqNo2",
      "redDt": "2023-12-02T13:00:00",
      "txnNo": "SampleTxnNo2",
      "reference": "SampleReference2",
      "requisitioner": "SampleRequisitioner2",
      "pdf": "SamplePdf2",
      "approvalStatus": "p",
      "approvalUserId": 123,
      "approvalDt": "2023-12-02T13:30:00",
      "approvalComments": "Approval for process",
      "id": 8,
      "status": false,
      "createdById": 456,
      "createdOn": "2023-12-02T13:45:00",
      "updatedById": 1,
      "updatedOn": "2023-12-02T12:39:05.0366667"
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    public platform: Platform,
    private nativeHTTP: HTTP,
    private filesave: File,
    private fb: FormBuilder

  ) {
    addIcons({ checkboxOutline, closeCircleOutline, closeOutline });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    this.type = this.route.snapshot.queryParams['type'];
    console.log(this.route.snapshot.queryParams['type'])
  }

  ngAfterViewInit() {
    this.modal.ionModalDidDismiss.subscribe((event: any) => {
      const dismissRole = event.detail.role;
      if (dismissRole == 'backdrop' || dismissRole == 'gesture') {
        this.isModalOpen = false;
      }
    });
  }

  openAppOrRejModal(isApprove: boolean = true) {
    this.CommendForm = this.fb.group({
      remarks: ['', [Validators.nullValidator,]]
    });
    this.isModalOpen = true;
  }

  handleChange(event: any) {
    if (event.detail.value == true) {
      let remarks: any = this.CommendForm.get("remarks");
      remarks.setValidators([Validators.nullValidator]);
      remarks.updateValueAndValidity();
    }
    else {
      let remarks: any = this.CommendForm.get("remarks");
      remarks.setValidators([Validators.required, Validators.minLength(10)]);
      remarks.updateValueAndValidity();
    }
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
    // "cordova-plugin-file-transfer": "github:apache/cordova-plugin-file-transfer",
    // this.platform.ready().then(async () => {
    //   debugger
    //   const fileTransfer: FileTransferObject = await this.transfer.create();
    //   fileTransfer.download(
    //     'https://file-examples.com/storage/febf69dcf3656dfd992b0fa/2017/10/file-sample_150kB.pdf',
    //     this.file.dataDirectory + 'muthu_kumaran_06_dec_2023').then((entry) => {
    //       debugger
    //       console.log('download complete: ' + entry.toURL());
    //     }, (error: any) => {
    //       debugger
    //       // handle error
    //     });
    // });
    const filePath = this.file.dataDirectory + 'file-sample_150kB.pdf';

    this.nativeHTTP.downloadFile(`https://www.africau.edu/images/default/sample.pdf`, {},
      {

      },
      filePath).then(response => {
        // prints 200
        this.fileOpener.open(response.nativeURL, 'application/pdf')
      }).catch(err => {
        // prints 403
        console.log('error block ... ', err.status);
        // prints Permission denied
        console.log('error block ... ', err.error);
      })
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
