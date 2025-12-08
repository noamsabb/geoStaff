import express, { Request, Response, Router } from "express";
import { employeeService } from "../4-services/employee-service";
import { EmployeeModel } from "../3-models/employee-model";
import { StatusCode } from "../3-models/status-code";

class EmployeeController {
  // Router object - holds all routes:
  public router: Router = express.Router();

  // Register routes:
  public constructor() {
    this.router.get("/api/employees", this.getAllEmployees);
    this.router.get("/api/employees/random-loc", this.getRandomEmployee);
    this.router.post("/api/employees", this.addUpdateEmployee);
    this.router.delete("/api/employees/:_id", this.deleteEmployee);
  }

  // Get all employees:
  private async getAllEmployees(request: Request, response: Response) {
    const employees = await employeeService.getAllEmployees();
    response.json(employees);
  }

  // Add new employee:
  private async addUpdateEmployee(request: Request, response: Response) {
    const employee = new EmployeeModel(request.body);
    const dbEmployee = await employeeService.addUpdateEmployee(employee);
    response.status(StatusCode.Created).json(dbEmployee);
  }

  private async deleteEmployee(request: Request, response: Response) {
    const _id = request.params._id;
    await employeeService.deleteEmployee(_id);
    response.sendStatus(StatusCode.NoContent);
  }

  private async getRandomEmployee(request: Request, response: Response) {
    const employee = await employeeService.getRandomEmployee();
    response.json(employee);
  }
}

export const employeeController = new EmployeeController();
