import { ToastService } from './services/toast.service';
import { BaseModule } from './../ui/base/base.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ContentComponent } from './../layout/content/content.component';
import { FullComponent } from './../layout/full/full.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DragulaModule } from "ng2-dragula";
import { TranslateModule } from "@ngx-translate/core";
// Components
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TapToTopComponent } from "./components/tap-to-top/tap-to-top.component";
// Header Elements Components
import { SearchComponent } from "./components/header/elements/search/search.component";
import { LanguagesComponent } from "./components/header/elements/languages/languages.component";
import { NotificationComponent } from "./components/header/elements/notification/notification.component";
import { BookmarkComponent } from "./components/header/elements/bookmark/bookmark.component";
import { MessageBoxComponent } from "./components/header/elements/message-box/message-box.component";
import { MyAccountComponent } from "./components/header/elements/my-account/my-account.component";

// Services
import { LayoutService } from "./services/layout.service";
import { NavService } from "./services/nav.service";
import { DecimalPipe } from "@angular/common";
import { SvgIconComponent } from "./components/svg-icon/svg-icon.component";
import { SwiperModule } from "swiper/angular";
import { ModalComponent, NgbdModalContent } from '../ui/base/modal/modal.component';
import { GeneratePdfDirective } from './directives/generate-pdf.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    ModalComponent,
    NgbdModalContent,
    BreadcrumbComponent,
    FeatherIconsComponent,
    FullComponent,
    LoaderComponent,
    TapToTopComponent,
    SearchComponent,
    LanguagesComponent,
    NotificationComponent,
    BookmarkComponent,
    MessageBoxComponent,
    MyAccountComponent,
    SvgIconComponent,
    GeneratePdfDirective
    
  ],
  imports: [
    
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule, DragulaModule.forRoot(), TranslateModule.forRoot(), SwiperModule],
  providers: [NavService, LayoutService, DecimalPipe,ToastService],
  exports: [NgbModule,
    GeneratePdfDirective,
    FormsModule, ReactiveFormsModule, TranslateModule, ModalComponent,LoaderComponent, BreadcrumbComponent, FeatherIconsComponent, TapToTopComponent, SvgIconComponent, SwiperModule],
})
export class SharedModule {}
