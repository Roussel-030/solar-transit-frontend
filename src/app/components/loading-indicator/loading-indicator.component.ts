import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading-indicator",
  imports: [NgFor],
  templateUrl: "./loading-indicator.component.html",
  styleUrl: "./loading-indicator.component.css",
})
export class LoadingIndicatorComponent {
  @Input() color: string = "#FFFFFF";
  delay: number = 0.2;
  dots = Array(3).fill(0);
}
