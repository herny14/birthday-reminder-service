import mongoose from "mongoose";
import validator from "validator";
import moment from "moment";
import { db1Connection } from "../connections.js";

const UserModel = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { 
    type: String, 
    required: [true, "Name is required"], 
    unique: [true, "Email already exists"],
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format"
    }
  },
  birthday: { 
    type: Date, 
    required: [true, "Birthday is required"],
    validate: {
      validator: value => moment(value, moment(value, moment.ISO_8601, true)).isValid(),
      message: "Invalid date format"
    }
  },
  timezone: { type: String, required: true },
})

const userModel = db1Connection.model("User", UserModel);
export default userModel