import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { changePasswordPageRoutingModule} from './change-password-routing.module';
import { changepasswordPage } from './change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    changePasswordPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [changepasswordPage],
  providers: [],
})
export class changePasswordPageModule { }
