import { Injectable, TemplateRef, ViewContainerRef } from "@angular/core";
import { ToastComponent } from "../../components/toast/toast.component";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  private toastComponentRef: ToastComponent | null = null;

  setToastComponentRef(toastComponentRef: ToastComponent): void {
    this.toastComponentRef = toastComponentRef;
  }

  showError(message: string, duration: number = 5000): void {
    if (this.toastComponentRef) {
      this.toastComponentRef.display(message, duration);
    }
  }
}
