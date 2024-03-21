import { fadeInAnimation } from './../../shared/data/router-animation/router-animation';
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as feather from "feather-icons";
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  animations: [fadeInAnimation],
})
export class ContentComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute, public navServices: NavService, public layout: LayoutService) {
    this.route.queryParams.subscribe((params) => {
      this.layout.config.settings.layout = params.layout ? params.layout : this.layout.config.settings.layout;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  get layoutClass() {
    return "compact-wrapper";
  }

  ngOnInit() {}
}
