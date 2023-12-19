import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DatePickerComponent } from './date-picker.component';
import { CustomCalenderModule } from '../calender/calender.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CustomCalenderModule
  ],
  exports: [DatePickerComponent],
  declarations: [DatePickerComponent]
})
export class DatePickerModule {}
