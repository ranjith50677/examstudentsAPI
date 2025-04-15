import express from 'express';
import {  facReg, getAllUser, login, profile, reg } from '../controller/userController.js';
import auth from '../middleware/auth.js';
import isFaculty from '../middleware/isFatculty.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post("/reg",reg)
router.post("/factreg",facReg)
router.post("/login",login)
router.get("/getalluser",getAllUser)
router.get("/profile",auth,profile)
// router.put("/addassignment",auth,addAssignment)

export default router;