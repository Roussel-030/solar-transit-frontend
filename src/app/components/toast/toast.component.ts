import { Component, Input } from "@angular/core";

@Component({
  selector: "app-toast",
  imports: [],
  templateUrl: "./toast.component.html",
  styleUrl: "./toast.component.css"
})
export class ToastComponent {
  @Input() message: string = "";
  show: boolean = false;

  display(message: string, duration: number = 5000): void {
    this.message = message;
    this.show = true;

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    this.show = false;
  }
}
