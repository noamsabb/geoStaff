import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { EmployeeModel } from "../models/employee-model";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private http = inject(HttpClient);

  public async getAllEmployees(): Promise<EmployeeModel[]> {
    const observable = this.http.get<EmployeeModel[]>(environment.employeesUrl);
    const employees = await firstValueFrom(observable);

    return employees;
  }
  public async getRandomEmployee(): Promise<EmployeeModel> {
    const observable = this.http.get<EmployeeModel>(environment.randomLocUrl);
    const employee = await firstValueFrom(observable);
    return employee;
  }

  public async addUpdateEmployee(employee: EmployeeModel): Promise<void> {
    const observable = this.http.post<EmployeeModel>(
      environment.employeesUrl,
      employee
    );
    const dbEmployee = await firstValueFrom(observable);
    console.log(dbEmployee);
  }

  public async deleteEmployee(id: string): Promise<void> {
    const observable = this.http.delete(environment.employeesUrl + id);
    await firstValueFrom(observable);
  }
}
