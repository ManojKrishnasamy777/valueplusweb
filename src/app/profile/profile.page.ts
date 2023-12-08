import { DocumentViewerOptions } from './../../../node_modules/@awesome-cordova-plugins/document-viewer/ngx/index.d';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonBackButton,IonCard, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonText, IonTitle, IonToolbar, IonRadio, IonRadioGroup, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkboxOutline, closeCircleOutline, closeOutline } from 'ionicons/icons';
import { Platform, ValueAccessor } from '@ionic/angular/common';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
    IonModal,
    FormsModule,
    ReactiveFormsModule,
    IonRadio,
    IonRadioGroup,
    IonRefresher,
    IonRefresherContent,
    IonCard
  ],
  providers: [
    DocumentViewer,
    FileOpener,
    FileTransfer,
    File,
    HTTP
  ]
})
export class ProfilePage implements OnInit, AfterViewInit {
  @ViewChild(IonModal) modal!: IonModal;
  commentsFc = new FormControl('');
  isModalOpen: boolean = false;
  type: string = '';
  Status: string = '';
  //@ts-ignore
  CommendForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,

  ) {
    addIcons({ checkboxOutline, closeCircleOutline, closeOutline });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  ngAfterViewInit() {
  
  }




  get fc() {
    return this.CommendForm.controls;
  }



  handleRefresh(event: any) {
    setTimeout(async () => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

}
