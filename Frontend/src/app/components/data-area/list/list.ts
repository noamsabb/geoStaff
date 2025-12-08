import { Component, inject, OnInit } from "@angular/core";
import { EmployeeService } from "../../../services/employee-service";
import { EmployeeModel } from "../../../models/employee-model";

@Component({
  selector: "app-list",
  imports: [],
  templateUrl: "./list.html",
  styleUrl: "./list.css",
})
export class List implements OnInit {
  public employees: EmployeeModel[] = [];
  private employeeServices = inject(EmployeeService);

  public async ngOnInit(): Promise<void> {
    try {
      this.employees = await this.employeeServices.getAllEmployees();
      console.log(this.employees);
      
    } catch (err: any) {
      alert(err.message);
    }
  }

  public async deleteMe(_id: string) {
    try {
      const sure = confirm("Are you sure?");
      if (!sure) return;
      await this.employeeServices.deleteEmployee(_id);
      alert("Employee has been deleted");
      this.employees = this.employees.filter((e) => e._id !== _id);
    } catch (err: any) {
      alert(err.message);
    }
  }
}
