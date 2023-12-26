import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent  implements OnInit {
  @Input() value: string = '';
  @Input() minDate: string = new Date().toISOString();
  @Input() maxDate: string = new Date().toISOString();
  selectedDate: string = '';
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  dismissModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onDateSelect(eve: Event) {
    const selectedDate = (eve.target as HTMLIonDatetimeElement).value;
    this.modalCtrl.dismiss(selectedDate, 'confirm');
    // console.log((eve.target as HTMLIonDatetimeElement).value);
  }

}
