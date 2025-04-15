import express from 'express';
import auth from '../middleware/auth.js';
import isFaculty from '../middleware/isFatculty.js';
import { attendAssign, stdViewTheirAllAssign,stdViewTheirParticularAssign,factViewTheirParticularAssign,stdViewTheirParticularAssignWithAns, factViewAllAssign } from '../controller/studentAssignmentController.js';

const router = express.Router();

router.put("/attendassign/:id",auth,attendAssign)
// router.post("/factreg",facReg)
// router.post("/login",login)
// router.get("/getalluser",getAllUser)
router.get("/stdviewallassign",auth,stdViewTheirAllAssign)
router.get("/stdviewsingleassign/:id",auth,stdViewTheirParticularAssign)
router.get("/stdviewsingleassignans/:id",auth,stdViewTheirParticularAssignWithAns)
router.get("/factviewsingleassign",[auth,isFaculty],factViewTheirParticularAssign)
router.get("/factviewallassign",[auth,isFaculty],factViewAllAssign)
// router.put("/addassignment",auth,addAssignment)

export default router;