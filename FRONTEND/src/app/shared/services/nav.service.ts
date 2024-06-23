import { Injectable, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from "rxjs";
import { takeUntil, debounceTime } from "rxjs/operators";
import { Router } from "@angular/router";
import { StorageService } from "src/app/core/services/storage.service";

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // role :

  role = 0;
  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router, private userServMang: StorageService) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  getMenuItems(role: number): Menu[] {
    // Generate menu items based on role
    let menuItems: Menu[] = [];

    if (this.userServMang.getCurrentUser()) {
      role = JSON.parse(this.userServMang.getCurrentUser()).data.role;
    }



    if (role == 1) {
      menuItems.push(
        {
          headTitle1: "Pages",
        },
        {
          path: "/modules/dashboard",
          icon: "home",
          title: "Dashboard",
          type: "link",
          bookmark: true,
        },

        {
          title: "Cars",
          icon: "truck",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: true,
          children: [
            {
              path: "/modules/cars/car-details",
              title: "Cars Details",
              type: "link",
            },
          ],
        },
        {
          title: "Contract",
          icon: "layout",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: false,
          children: [
            {
              path: "/modules/contracts/contract/contract-details",
              title: "Contract Page",
              type: "link",
            },
      
          ],
        },
        {
          title: "Customers",
          icon: "user",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: false,
          children: [
            {
              path: "/modules/customers/customers-list",
              title: "Customers Page",
              type: "link",
            },
          ],
        },

        {
          headTitle1: "Permissions Users",
        },
        {
          title: "Permission",
          icon: "list",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: false,
          children: [
            {
              path: "/modules/permissions/permissions-details",
              title: "Permission Page",
              type: "link",
            },
          ],
        },

        {
          title: "Branchs",
          icon: "info",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: true,
          children: [
            {
              path: "/modules/branchs/branch-list-admin",
              title: "Branchs Details",
              type: "link",
            },
          ],
        },
        {
          title: "Users",
          icon: "users",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: true,
          children: [
            {
              path: "/modules/users/users-list",
              title: "Users Details",
              type: "link",
            },
          ],
        }
      );
    }

    // EDITOR USER
    else if (role == 2) {
      menuItems.push(
        {
          headTitle1: "Pages",
        },
        {
          path: "/modules/dashboard",
          icon: "home",
          title: "Dashboard",
          type: "link",
          bookmark: true,
        },

        {
          title: "Cars",
          icon: "home",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: true,
          children: [
            {
              path: "/modules/cars/car-details",
              title: "Cars Details",
              type: "link",
            },
          ],
        },
        {
          title: "Contract",
          icon: "layout",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: false,
          children: [
            {
              path: "/modules/contracts/contract/contract-details",
              title: "Contract Page",
              type: "link",
            },
          
          ],
        },
        {
          title: "Customers",
          icon: "users",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: true,
          children: [
            {
              path: "/modules/customers/customers-list",
              title: "Users Details",
              type: "link",
            },
          ],
        }
        // {
        //   title: "Reports",
        //   icon: "layout",
        //   type: "widget",
        //   badgeType: "light-primary",
        //   badgeValue: "1",
        //   active: false,
        //   children: [
        //     { path: "/modules/customers/customers-list", title: "Customers Page", type: "link" },
        //   ],
        // },
      );
    }
    // VIEWER
    else {
      menuItems.push(
        {
          headTitle1: "Pages",
        },

        {
          title: "Reports",
          icon: "layout",
          type: "sub",
          badgeType: "light-primary",
          badgeValue: "1",
          active: false,
          children: [
            { path: "/modules/reports", title: "Reports Page", type: "link" },
          ],
        },
       { title: "History",
        icon: "layout",
        type: "sub",
        badgeType: "light-primary",
        badgeValue: "5",
        active: false,
        children: [
          {
            path: "/modules/history/cars",
            title: "Rented Cars",
            type: "link",
          },
          {
            path: "/modules/contracts/contract/contract-backups",
            title: "Open Contract(Doing)",
            type: "link",
          },
          {
            path: "/modules/contracts/contract/contract-backups",
            title: "Closed Contract(Doing)",
            type: "link",
          },
          {
            path: "/modules/contracts/contract/contract-backups",
            title: "Customers(Doing)",
            type: "link",
          },
          {
            path: "/modules/contracts/contract/contract-backups",
            title: "Avaliable Cars(Doing)",
            type: "link",
          },
        ],
      }
      );


      



    }

    

    return menuItems;
  }

  items = new BehaviorSubject<Menu[]>(this.getMenuItems(this.role));
  updateMenuItems(role: number): void {
    this.role = role;
    const updatedMenuItems = this.getMenuItems(role);
    this.items.next(updatedMenuItems);
  }
}
