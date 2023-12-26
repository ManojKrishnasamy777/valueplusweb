import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { changepasswordPage } from './change-password.page'; // Import the correct page component

const routes: Routes = [
  {
    path: '',
    component: changepasswordPage, // Specify the component for this route
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class changePasswordPageRoutingModule {}
