import express from 'express';
import { createAssign, geByIdAssign, getAllAssign } from '../controller/assignmentController.js';
import auth from '../middleware/auth.js';
import isFaculty from '../middleware/isFatculty.js';
import { chart } from '../controller/chartAndPdfController.js';

const router = express.Router();

router.post("/createassign",[auth,isFaculty],createAssign)
router.get("/getallassign",getAllAssign)
router.get("/getbyidassign/:id",geByIdAssign)
router.get("/get",chart)

export default router;