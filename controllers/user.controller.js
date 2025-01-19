import User from "../models/user.model.js";
import _ from "lodash";

import helperTimezone from "../helpers/timezone.js";

const createUser = async (req, res) => {
  try {
    let data = req.body.newUser;

    // VALIDATE TIMEZONE
    if (!helperTimezone.isValidTimezone(data.timezone)) {
      return res.status(403).json({ message: "Invalid timezone" });
    }

    const userDetail = new User(data);

    const result = await userDetail.save();

    return res.status(200).json(result);
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ err: err });
  }
}

const readUser = async (req, res) => {
  try {
    const userID = req.params.id;

    const userDetail = await User.findById(userID);
      
    if (!(userDetail)) {
      return res.status(200).json({ message: "User not found" });
    }
    
    return res.status(200).json(userDetail);
    
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ err: err });
  }
}

const updateUser = async (req, res) => {
  try {
    const userID = req.body._id;
    const updateData = req.body.updateData;

    const result = await User.findOneAndUpdate({
      _id: userID
    }, { $set: updateData }, { new: true });

    if (_.isEmpty(result)) {
      return res.status(403).json({ message: "User not found" });
    }
    else {
      return res.status(200).json(result);
    }
   
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ err: err });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userID = req.body._id;

    const result = await User.findOneAndDelete({
      _id: userID
    })

    if (_.isEmpty(result)) {
      return res.status(403).json({ message: "User not found" });
    }
    else {
      return res.status(200).json(result);
    }
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ err: err });
  }
}

const getAllUser = async (req, res) => {
  try {
    const listUsers = await User.find({})
      .sort({_id: -1 })
      .lean();

    return res.status(200).json(listUsers);
  }
  catch (err) {
    console.log(err);
    return res.status(403).json({ err: err });
  }
}


export default {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  getAllUser
}