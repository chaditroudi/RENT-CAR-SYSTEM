import { Component, Input } from "@angular/core";
import { Car } from "src/app/core/models/car.model";

@Component({
  selector: "app-chart-box",
  templateUrl: "./chart-box.component.html",
  styleUrls: ["./chart-box.component.scss"],
})
export class ChartBoxComponent {
  @Input() validInss: Car[];

  @Input() validRegist: Car[];

  activeTab: string = "tab1";

  setActiveTabs(tab) {
    this.activeTab = tab;
  }
}
