import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './Shared/layout/layout.component';
import { AuthGuard } from '../Helper/AuthGuard';
const routes: Routes = [
  {
    path: "",
    redirectTo: "/Login",
    pathMatch: "full"
  },
  {
    path: "Login",
    loadChildren: () => import('./Login/login.component').then(o => o.LoginModule)
  },
  {
    path: "Forgot",
    loadChildren: () => import('./ForgotPassword/forgot-password.component').then(o => o.ForgotPasswordModule)
  },
  {
    path: "ResetPassword/:id",
    loadChildren: () => import('./ResetPassword/reset-password.component').then(o => o.ResetPasswordModule)
  },
  {
    canActivate: [AuthGuard],
    path: "Country/:id", component: LayoutComponent,
    loadChildren: () => import('./country/country//country.component').then(o => o.CountrytModule),
    data: { MenuName: "Country", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Country", component: LayoutComponent,
    loadChildren: () => import('./country/country-list/countrylist.component').then(o => o.CountryListModule),
    data: { MenuName: "Country", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "ChangePassword", component: LayoutComponent,
    loadChildren: () => import('./Shared/Changepassword/changepassword.component').then(o => o.ChangePasswordModule),
    data: { MenuName: "Change Password", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "AdminDashboard", component: LayoutComponent,
    loadChildren: () => import('./AdminDashboard/admindashboard.compponent').then(o => o.AdminDashboardModule),
    data: { MenuName: "Admin Dashboard", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Branch/:id", component: LayoutComponent,
    loadChildren: () => import('./Branch/Branch/branch.component').then(o => o.BranchtModule),
    data: { MenuName: "Branch", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "BranchList", component: LayoutComponent,
    loadChildren: () => import('./Branch/Branch-List/branchlist.component').then(o => o.BranchListModule),
    data: { MenuName: "BranchList", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "State", component: LayoutComponent,
    loadChildren: () => import('./state/state.component').then(o => o.StateModule),
    data: { MenuName: "State", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "City", component: LayoutComponent,
    loadChildren: () => import('./City/city.component').then(o => o.CityModule),
    data: { MenuName: "City", Module: "Admin" }
  },
  // {
  //   canActivate: [AuthGuard],
  //   path: "Qualification", component: LayoutComponent,
  //   loadChildren: () => import('./Qualification/Qualification/qualification.component').then(o => o.QualificationModule),
  //   data: { MenuName: "Qualification", Module: "Admin" }
  // },
  {
    canActivate: [AuthGuard],
    path: "QualificationList", component: LayoutComponent,
    loadChildren: () => import('./Qualification/Qualification-List/qualificationlist.component').then(o => o.QualificationListModule),
    data: { MenuName: "QualificationList", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Qualification/:id", component: LayoutComponent,
    loadChildren: () => import('./Qualification/Qualification/qualification.component').then(o => o.QualificationModule),
    data: { MenuName: "Qualification", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Parent/:id", component: LayoutComponent,
    loadChildren: () => import('./Parent/Parent/parent.component').then(o => o.parentModule),
    data: { MenuName: "Parent", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "ParentList", component: LayoutComponent,
    loadChildren: () => import('./Parent/Parent-List/parentlist.component').then(o => o.ParentListModule),
    data: { MenuName: "Parent List", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Employee/:id", component: LayoutComponent,
    loadChildren: () => import('./Employee/Employee/employee.component').then(o => o.EmployeeModule),
    data: { MenuName: "Employee", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "EmployeeList", component: LayoutComponent,
    loadChildren: () => import('./Employee/Employee-List/employeelist.component').then(o => o.EmployeeListModule),
    data: { MenuName: "Employee", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Children/:id", component: LayoutComponent,
    loadChildren: () => import('./children/Children/children.component').then(o => o.childrenModule),
    data: { MenuName: "Children", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "ChildrenList", component: LayoutComponent,
    loadChildren: () => import('./children/Children-List/childrenlist.component').then(o => o.ChildrenListModule),
    data: { MenuName: "ChildrenList", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "Goal/:id", component: LayoutComponent,
    loadChildren: () => import('./Goal/Goal/goal.component').then(o => o.GoalModule),
    data: { MenuName: "Goal", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "GoalList", component: LayoutComponent,
    loadChildren: () => import('./Goal/Goal-List/goallist.component').then(o => o.GoalListModule),
    data: { MenuName: "GoalList", Module: "Admin" }
  },

  {
    canActivate: [AuthGuard],
    path: "UserList",
    component: LayoutComponent, loadChildren: () => import('./User/User-List/userlist.component').then(o => o.UserlistModule),
    data: { MenuName: "User", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "User/:id", component: LayoutComponent,
    loadChildren: () => import('./User/User/user.component').then(o => o.UserModule),
    data: { MenuName: "User", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "UserRole/:id", component: LayoutComponent,
    loadChildren: () => import('./UserRole/User_Role/userrole.component').then(o => o.UserRoleModule),
    data: { MenuName: "User Role", Module: "Admin" }
  },
  {
    canActivate: [AuthGuard],
    path: "UserRoleList", component: LayoutComponent,
    loadChildren: () => import('./UserRole/user-RoleList/user-rolelist.component').then(o => o.UserRoleListModule),
    data: { MenuName: "User Role", Module: "Admin" }
  },
  {
    path: "AccessDenied",
    component: LayoutComponent,
    loadChildren: () => import('./AccessDenied/access-denied.component').then(o => o.AccessDeniedModule)
  },
  {
    path: "**",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./PageNotFound/page-not-found.component').then(o => o.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
