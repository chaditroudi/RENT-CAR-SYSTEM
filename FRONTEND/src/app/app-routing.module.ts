import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";
import { ContentComponent } from './layout/content/content.component';
import { FullComponent } from './layout/full/full.component';
import { CarDetailsComponent } from './modules/cars/car-details/car-details.component';
import { UnauthorizedPageComponent } from './shared/pages/errors/unauthorized-page/unauthorized-page.component';
import { NotFoundPageComponent } from './shared/pages/errors/not-found-page/not-found-page.component';
import { BranchsListComponent } from './modules/branchs/branchs-list-user/branchs-list.component';

const routes: Routes = [
{
  path: "branchs/branch-list",
  component: BranchsListComponent,
},

  {
    path:"account/login",
    component:LoginComponent,
    

  },
  {
    path: "",
    component: ContentComponent,
    children: content

  },
  {
    path: "",
    component: FullComponent,
    children: full


  },
  {

    path:'forbidden',
    component:UnauthorizedPageComponent
  },
  {
    path: "**",
    component:NotFoundPageComponent

  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        anchorScrolling: "enabled",
        scrollPositionRestoration: "enabled",
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
