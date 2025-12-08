import { Document, model, ObjectId, Schema } from "mongoose";

export interface IEmployeeModel extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  latitude: number;
  longitude: number;
}

export const EmployeeSchema = new Schema<IEmployeeModel>(
  {
    firstName: {
      type: String,
      required: [true, "Missing firstName."],
      minlength: [2, "firstName too short."],
      maxlength: [50, "firstName too long."],
    },
    lastName: {
      type: String,
      required: [true, "Missing lastName."],
      minlength: [2, "lastName too short."],
      maxlength: [50, "lastName too long."],
    },
    email: {
      type: String,
      required: [true, "Missing email."],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email."],
      lowercase: true,
      unique: true,
    },
    latitude: {
      type: Number,
      required: [true, "Missing Latitude"],
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: [true, "Missing Longitude"],
      min: -180,
      max: 180,
    },
  },
  { versionKey: false, toJSON: { virtuals: true }, id: false, timestamps: true }
);

export const EmployeeModel = model<IEmployeeModel>(
  "EmployeeModel",
  EmployeeSchema,
  "employees"
);
