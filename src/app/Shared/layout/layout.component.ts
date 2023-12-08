import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from '../Changepassword/changepassword.component';
import { DropdownModule } from "primeng/dropdown";
declare var bootstrap: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  providers: [DialogService, DropdownModule]
})

export class LayoutComponent implements OnInit, AfterViewInit, AfterViewChecked {
  LeftMenu: any = [];
  Module: any = [];
  constructor(
    public helper: CommonHelper,
    private service: CommonService,
    private router: ActivatedRoute,
    private _dialogService: DialogService
  ) {
  }

  async ngAfterViewInit() {
    window.addEventListener('storage', function (e) {
      window.location.reload();
    });
    await this.toggleSubmenuList();
    let activeMenu = document.querySelector('.navigation-link.active') as HTMLElement;
    if (activeMenu?.parentElement?.parentElement?.classList?.contains('sub-menu-list')) {
      (activeMenu.parentElement.parentElement.previousElementSibling as HTMLAnchorElement).click();
      setTimeout(() => {
        let nav = activeMenu.offsetParent as HTMLElement;

        let navHeight = nav.offsetHeight;
        if (navHeight < activeMenu.offsetTop + activeMenu.offsetHeight) {
          nav.scroll(0, (((activeMenu.offsetTop + activeMenu.offsetHeight) - navHeight) + 80))

        }
      }, 300);
    }
  }

  ngAfterViewChecked() {
  }

  async ngOnInit() {
    this.FillLeftMenu();
    setTimeout(() => {
      let navLinkActive: HTMLElement = document.querySelector('.menu.active');
      let isSubmenu = navLinkActive?.parentElement.parentElement?.classList.contains('sub-menu-list');
      if (isSubmenu) {
        let subMenuList: HTMLElement = navLinkActive.parentElement.parentElement;
        subMenuList.style.height = `${subMenuList.scrollHeight}px`;
        setTimeout(() => {
          let nav = document.querySelector('.side-men-content') as HTMLElement;
          let navHeight = nav.offsetHeight;
          if (navHeight < navLinkActive.offsetTop + navLinkActive.offsetHeight) {
            nav.scroll(0, (((navLinkActive.offsetTop + navLinkActive.offsetHeight) - navHeight) + 350))
          }
        }, 500);
      }
    }, 0)
  }

  FillLeftMenu() {
    this.Module = [
      { icon: "pi pi-user", label: "Admin", routerLink: "/AdminDashboard", Visiable: true },

    ];


    this.LeftMenu = [
      { Module: "Admin", Icon: "dashboard", Name: "Dashboard", Link: "/AdminDashboard", Child: false, Visible: true },
      { Module: "Admin", Icon: "business", Name: "Branch InFo", Link: "/BranchList", Child: false, Visible: true },
      {
        Module: "Admin", Icon: "manage_accounts", Name: "Users", Child: true, Visible: true,
        ChildList: [
          { Name: "User Role", Icon: "supervised_user_circle", Link: "/UserRoleList", Child: false, Visible: true },
          { Name: "User", Icon: "account_circle", Link: "/UserList", Child: false, Visible: true },
          { Name: "Employee", Icon: "people", Link: "/EmployeeList", Child: false, Visible: true },
          { Name: "Parent", Icon: "person", Link: "/ParentList", Child: false, Visible: true },
          { Name: "Children", Icon: "groups", Link: "/ChildrenList", Child: false, Visible: true },
          { Name: "Goals", Icon: "person", Link: "/GoalList", Child: false, Visible: true },
        ]
      },
      {
        Module: "Admin", Icon: "settings", Name: "Settings", Child: true, Visible: true,
        ChildList: [
          { Module: "Admin", Icon: "school", Name: "Qualification ", Link: "/QualificationList", Child: false, Visible: true },
          { Module: "Admin", Icon: "public", Name: "Country ", Link: "/Country", Child: false, Visible: true },
          { Module: "Admin", Icon: "location_on", Name: "State", Link: "/State", Child: false, Visible: true },
          { Module: "Admin", Icon: "location_city", Name: "City ", Link: "/City", Child: false, Visible: true },
        ]
      },
    ]
    this.router.data.subscribe((or) => {
      if (this.router.routeConfig.path != "Profile") {
        this.helper.CurrentModule = or.Module;
      }
      this.LeftMenu = this.LeftMenu.filter(o => o.Module == this.helper.CurrentModule);
    });
    this.LeftMenu = this.LeftMenu.filter(o => o.Visible);
    this.LeftMenu = this.LeftMenu.filter(o => {
      if (o.ChildList) {
        o.ChildList = o.ChildList.filter(o => o.Visible);
        return true;
      }
      else {
        return true;
      }
    });
    this.Module = this.Module.filter(o => o.Visiable == true);
  }
  SetMenu(item: any) {
    this.helper.redirectTo(item.routerLink)
  }
  async Logout() {
    this.helper.ShowSpinner();
    this.helper.DeleteAllLocalStorage();
    this.helper.redirectTo("Login");
    this.helper.HideSpinner();
  }

  toggleMenu() {
    document.querySelector('.aside-container').classList.toggle('active');
  }

  collapseSidenav() {
    (document.querySelector('.aside-container') as HTMLElement).classList.toggle('collapse-side-nav');
  }

  toggleSubmenuList() {
    let activeDropDown;
    let dropdownlist = document.querySelectorAll('.nav-link-dropdown-btn');

    for (let i = 0; i < dropdownlist.length; i++) {
      dropdownlist[i].addEventListener('click', (event) => {
        if ((event.currentTarget as HTMLElement).classList.contains('active')) {
          (event.currentTarget as HTMLElement).classList.remove('active');
          (event.currentTarget as HTMLElement).nextElementSibling.removeAttribute('style');
        } else {
          if (activeDropDown && !(event.currentTarget as HTMLElement).classList.contains('profile-dropdown-btn')) {
            (activeDropDown as HTMLElement).classList.remove('active');
            ((activeDropDown as HTMLElement).nextElementSibling as HTMLElement).removeAttribute('style')
          }
          (event.currentTarget as HTMLElement).classList.add('active');
          ((event.currentTarget as HTMLElement).nextElementSibling as HTMLElement).style.height = (event.currentTarget as HTMLElement).nextElementSibling.scrollHeight + 'px';
          if (!(event.currentTarget as HTMLElement).classList.contains('profile-dropdown-btn')) {
            activeDropDown = event.currentTarget;
          }
        }
      });
    }
  }

  ChangePassword() {
    this._dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '50%'
    });
  }
}