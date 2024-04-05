import { LoginComponent } from './modules/auth/login/login.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";
import { ContentComponent } from './layout/content/content.component';
import { FullComponent } from './layout/full/full.component';
import { CarDetailsComponent } from './modules/cars/car-details/car-details.component';

const routes: Routes = [


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
    path: "**",
    redirectTo: "",
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
