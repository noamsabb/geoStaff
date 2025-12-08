import { log } from "console";
import { ResourceNotFound, ValidationError } from "../3-models/client-errors";
import { EmployeeModel, IEmployeeModel } from "../3-models/employee-model";

class EmployeeService {
  public async getAllEmployees(): Promise<IEmployeeModel[]> {
    return EmployeeModel.find().exec();
  }

  public async addUpdateEmployee(
    employee: IEmployeeModel
  ): Promise<IEmployeeModel> {
    const error = employee.validateSync();
    if (error) throw new ValidationError(error.message);
    //If employee don't exist already => add new
    const existingEmployee = await EmployeeModel.findOne({
      email: employee.email,
    }).exec();

    if (!existingEmployee) return employee.save();
    //If employee Already exist => update
    else {
      const updateData = { ...employee.toObject() };
      delete updateData._id;

      const dbEmployee = await EmployeeModel.findByIdAndUpdate(
        existingEmployee._id,
        updateData,
        { returnOriginal: false }
      ).exec();

      if (!dbEmployee) throw new ResourceNotFound(existingEmployee._id);

      return dbEmployee;
    }
  }

  public async deleteEmployee(_id: string): Promise<void> {
    const dbEmployee = await EmployeeModel.findByIdAndDelete(_id, {
      returnOriginal: false,
    }).exec();
    if (!dbEmployee) throw new ResourceNotFound(_id);
  }

  public async getRandomEmployee(): Promise<IEmployeeModel> {
    const employees = await EmployeeModel.aggregate([{ $sample: { size: 1 } }]);
    return employees[0];
  }
}

export const employeeService = new EmployeeService();
