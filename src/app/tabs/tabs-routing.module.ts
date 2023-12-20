import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { canActivateTeam } from 'src/app/Service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: 'booking',
      //   loadChildren: () => import('../booking/booking.module').then(m => m.BookingPageModule),
      //   canActivate: [canActivateTeam],
      // },
      // {
      //   path: 'addbooking',
      //   loadChildren: () => import('../addbooking/addbooking.module').then(m => m.AddBookingPageModule),
      //   canActivate: [canActivateTeam],
      // },

      // {
      //   path: 'inspection/:id',
      //   loadChildren: () => import('../inspection/inspection.module').then(m => m.InspectionPageModule),
      //   canActivate: [canActivateTeam],
      // },
      // {
      //   path: 'damage',
      //   loadChildren: () => import('../damage/damage.module').then(m => m.BookingPageModule),
      //   canActivate: [canActivateTeam],
      // },
      // {
      //   path: 'client',
      //   loadChildren: () => import('../client/client.module').then(m => m.ClientPageModule),
      //   canActivate: [canActivateTeam],
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile/profile.module').then(m => m.profilePageModule)
      // },
      // {
      //   path: 'changepassword',
      //   loadChildren: () => import('../change-password/change-password.module').then(m => m.changePasswordPageModule)
      // },
      // {
      //   path: '',
      //   redirectTo: '/inspection',
      //   pathMatch: 'full'
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // imports: [RouterModule.forChild(routes, {onSameUrlNavigation: 'reload'})],

})
export class TabsPageRoutingModule { }
