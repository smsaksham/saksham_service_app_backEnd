import express from 'express'
import { changePassword, deleteUser, emailVerify, forgetPassword, loginUser, otpVarification, registerUser } from "../controller/userController.js";

const route = express.Router();

route.post("/saveUser",registerUser);
route.post("/loginUser",loginUser);
route.post("/otpVarification",otpVarification);
route.post("/forgetPassword",forgetPassword);
route.post("/changePassword",changePassword);
route.post("/emailVerification",emailVerify);
route.delete("/deleteUser",deleteUser);

export default route;