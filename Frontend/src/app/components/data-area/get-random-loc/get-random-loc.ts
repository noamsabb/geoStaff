import { Component, inject } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { EmployeeModel } from "../../../models/employee-model";
import { EmployeeService } from "../../../services/employee-service";

@Component({
  selector: "app-get-random-loc",
  imports: [],
  templateUrl: "./get-random-loc.html",
  styleUrl: "./get-random-loc.css",
})
export class GetRandomLoc {
  private sanitizer = inject(DomSanitizer);
  private employeeService = inject(EmployeeService);
  public employee!: EmployeeModel;

  public async drawEmployee() {
    this.employee = await this.employeeService.getRandomEmployee();
    console.log(this.employee);
  }

  public getMapUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?q=${this.employee.latitude},${this.employee.longitude}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
