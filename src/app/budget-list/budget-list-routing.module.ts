import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetListPage } from './budget-list.page';

const routes: Routes = [
    {
        path: '',
        component: BudgetListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BudgetListRoutingModule { }
