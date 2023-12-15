import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.page').then( m => m.SignInPage)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then( m => m.routes)
  },
  {
    path: 'walkthrough',
    loadComponent: () => import('./walkthrough/walkthrough.page').then( m => m.WalkthroughPage)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'budget-list',
    loadComponent: () => import('./budget-list/budget-list.page').then( m => m.BudgetListPage)
  },
  {
    path: 'budget-detail',
    loadComponent: () => import('./budget-detail/budget-detail.page').then( m => m.BudgetDetailPage)
  },
];
