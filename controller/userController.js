import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const reg = async (req, res) => {
    const saltRounds = 10;
    if (!req.body.name) return res.status(400).json({ message: "please enter name" });
    if (!req.body.email) return res.status(400).json({ message: "please enter email" });
    if (!req.body.password) return res.status(400).json({ message: "please enter password" });
    if (!req.body.class) return res.status(400).json({ message: "please enter class" });
    let email = req.body.email; 
    let exUserEmail = await User.findOne({ email: email });
    if (exUserEmail) return res.status(400).json({ message: "email already register" });
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      try {
        let register =await new User({
          name: req.body.name,
          email: email?.toLowerCase(),
          password: hash,
          class: req.body.class,
        });
        let user = await register.save();
        res.status(201).json({ message: "Register success" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
};
  
export const facReg = async (req, res) => {
    const saltRounds = 10;
    if (!req.body.name) return res.status(400).json({ message: "please enter name" });
    if (!req.body.email) return res.status(400).json({ message: "please enter email" });
    if (!req.body.password) return res.status(400).json({ message: "please enter password" });
    let email = req.body.email; 
    let exUserEmail = await User.findOne({ email: email });
    if (exUserEmail) return res.status(400).json({ message: "email already register" });
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      try {
        let register =await new User({
          name: req.body.name,
          email: email?.toLowerCase(),
          password: hash,
          isFaculty: true,
        });
        let user = await register.save();
        res.status(201).json({ message: "Register success" });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
};
  
export const login = async (req, res) => {
    let email = req.body.email?.toLowerCase();
    let foundUser = await User.findOne({ email: email });
    if (!req.body.email) return res.status(400).json({ message: "please enter email" });
    if (!req.body.password) return res.status(400).json({ message: "please enter password" });
    if (foundUser) {
        bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
        if (result) {
            try {
                const token = jwt.sign({ id: foundUser?._id }, process.env.JWT, {
                expiresIn: "12h",
                });
                res.header("hrms-auth-token", token).json({ message: "login successfully", token: token });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        } else {
            res.status(400).json({ message: "please enter correct password" });
        }
      });
    } else {
        res.status(404).json({ message: "user not found" });
    }
};
  
export const profile = async (req, res) => {
    try {
      const view = await User.findById({ _id: req.user.id }).select("-password");
      if (!view) return res.status(404).json({ message: "user not found" });
      res.status(200).json({ data: view });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const view = await User.find().select("-password").populate("assignments" ,"-attendedStudents");
        if (!view) return res.status(404).json({ message: "users not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
// export const addAssignment = async (req, res) => {
//     try {
//       const view = await User.find().select("-password");
//       if (!view) return res.status(404).json({ message: "users not found" });
//       res.status(200).json({ data: view });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
// };
  


export const getByIdAttendAssign = async (req, res) => {
    try {
        const view = await User.findOne({_id: req.user.id,});
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};