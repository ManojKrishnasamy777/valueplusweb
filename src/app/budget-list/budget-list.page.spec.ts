import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetListPage } from './budget-list.page';

describe('BudgetListPage', () => {
  let component: BudgetListPage;
  let fixture: ComponentFixture<BudgetListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BudgetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
