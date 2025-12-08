import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { EmployeeModel } from "../../../models/employee-model";
import { EmployeeService } from "../../../services/employee-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add",
  imports: [FormsModule],
  templateUrl: "./add.html",
  styleUrl: "./add.css",
})
export class Add implements OnInit {
  public employee = new EmployeeModel();
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  public getMapUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${this.employee.latitude},${this.employee.longitude}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.employee.latitude = position.coords.latitude;
          this.employee.longitude = position.coords.longitude;
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert(
            "Unable to get your location. Please enter coordinates manually."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  public async send(): Promise<void> {
    try {
      await this.employeeService.addUpdateEmployee(this.employee);
      alert("Employee has been added/updated.");
      this.router.navigate(["/list"]);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
