import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NumericDirective } from "src/Directives/number-text-box.directive";
import { DropdownFooterDirective } from "src/Directives/dropdown-footer.directive";
import { NgPipesModule } from 'ngx-pipes';
import { ValidationModule } from '../app/Shared/Validation/validation.component';
import { GetSumValuePipe } from '../Pipe/GetSumValue.pipe';
import { ConfirmationService } from 'primeng/api';
import { AbsstatusModule } from '../app/Shared/absstatus/absstatus.component';
import { LoadImage } from '../Pipe/LoadImage.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    NumericDirective,
    DropdownFooterDirective,
    GetSumValuePipe,
    LoadImage,
  ],
  imports: [

  ],
  providers: [
    ConfirmationService,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AbsstatusModule,
    NumericDirective,
    DropdownFooterDirective,
    NgPipesModule,
    ValidationModule,
    GetSumValuePipe,
    LoadImage,
    ConfirmDialogModule,
    InputNumberModule,
  ]
})
export class ModuleData { }
