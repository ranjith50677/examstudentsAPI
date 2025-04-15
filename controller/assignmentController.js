import Assignment from "../model/assignmentModel.js";
import StudentAssignment from "../model/studentAssignment.js";
import User from "../model/userModel.js";

 
export const createAssign = async (req, res) => {
    let selectedClass = req.body.class;
    if(!selectedClass) return res.status(400).json({ message: "please enter class " })
    if (!req.body.assignmentTitle) return res.status(400).json({ message: "please enter assignment title" });
    if (!req.body.totalMarks) return res.status(400).json({ message: "please enter totalMarks" });
    if (!req.body.subject) return res.status(400).json({ message: "please enter subject" });
    let found = await Assignment.findOne({ assignmentTitle: req.body.assignmentTitle ,subject:req.body.subject, class: selectedClass });
    // console.log(found);
    if (found) return res.status(400).json({ message: "assignment already exists" });
    try {
        let assignment = await new Assignment(req.body);
        let save=await assignment.save();
        res.status(201).json({ message: "Assignment created successfully" });
        let getAllStudent = await User.find({isFaculty: false, class: selectedClass});
        getAllStudent.map(async (student)=>{
            await User.findByIdAndUpdate({_id: student._id},{$push:{assignments: save._id}},{new:true});
            let add = new StudentAssignment({
                assignment: save._id,
                student: student._id
            })
            await add.save();
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllAssign = async (req, res) => {
    try {
        const view = await Assignment.find();
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  

export const geByIdAssign = async (req, res) => {
    try {
        const view = await Assignment.findById({_id: req.params.id});
        view.question.map((question)=> {
            question.answer = "";
        })
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  

