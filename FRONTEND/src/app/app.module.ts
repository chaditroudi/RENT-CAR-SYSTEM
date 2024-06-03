import { NgSelectModule } from '@ng-select/ng-select';

import { AuthGuard } from './core/guards/auth.guard';
import { FeatherIconComponent } from './shared/components/icons/feather-icon/feather-icon.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component'
import { fadeInAnimation } from './shared/data/router-animation/router-animation';
;

import { OverlayModule } from '@angular/cdk/overlay';
import { LoginComponent } from './modules/auth/login/login.component';
import { BaseModule } from './ui/base/base.module';
import { BranchsListComponent } from './modules/branchs/branchs-list-user/branchs-list.component';
import { DrawingComponent } from './lib/drawing/drawing.component';
import { LoadingSpinnerComponent } from './ui/base/loading-spinner/loading-spinner.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BranchsListComponent,
    
    
  ],

  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    BaseModule,
    

    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FeatherIconComponent,
    NgSelectModule,

    OverlayModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BaseModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    
//     // for HttpClient use:
    LoadingBarHttpClientModule,
//     // for Router use:
    LoadingBarRouterModule,
//     // for Core use:
    LoadingBarModule

  ],
  providers: [ CookieService,AuthGuard],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
