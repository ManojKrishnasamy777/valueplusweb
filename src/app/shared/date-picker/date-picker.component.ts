import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalenderComponent } from '../calender/calender.component';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => DatePickerComponent)
  }]
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  @Input() ipLabel: string = 'date';
  @Input() disabled: boolean = false;
  @Input() calenderId: string = '';
  @Input() readonly: boolean = false;
  @Output() change = new EventEmitter<any>();
  date: any;
  // displayValue: any;

  onChange = (date: any) => { };
  onTouched = () => { };
  constructor(
    private modalCtrl: ModalController
  ) {
    // this.displayValue = this.date && new Date(this.date);
  }

  writeValue(obj: any): void {
    this.date = obj;
    // console.log(this.disabled);
    // this.displayValue = new Date(obj);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() { }

  modalPresent() {
    this.onTouched();
    // alert('modalPresent');
  }

  async presentCalenderModal() {
    // if(this.disabled) {
    //   return;
    // }
    // console.log(this.date)
    const modal = await this.modalCtrl.create({
      component: CalenderComponent,
      id: 'calender-modal',
      componentProps: {
        value: this.date
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.date = new Date(data).toISOString();
      // this.displayValue = new Date(data);
      this.onChange(new Date(data).toISOString());
      this.change.emit(new Date(data).toISOString());
    }
    this.onTouched();
  }

}
