import Assignment from "../model/assignmentModel.js";
import StudentAssignment from "../model/studentAssignment.js";
import User from "../model/userModel.js";

// export const asttendAssign = async (req, res) => {
//     if (!req.body.student) return res.status(400).json({ message: "please enter student id" });
//     if (!req.body.assignment) return res.status(400).json({ message: "please enter assignment id" });
//     try {
//         let stdAssignment = await new StudentAssignment(req.body);
//         let save=await stdAssignment.save();
//         res.status(201).json({ message: "Assignment created successfully" });
//         let getAllStudent = await User.find({isFaculty: false});
//         getAllStudent.map(async (student)=>{
//             await User.findByIdAndUpdate({_id: student._id},{$push:{assignments: save._id}},{new:true});
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

export const attendAssign = async (req, res) => {
    try {
        if (!req.body.answers)  return res.status(400).json({ message: "please answer all the questions" }) 
        if(req.body?.answers?.length == 0) return res.status(400).json({ message: "please answer all the questions" })
        const view = await StudentAssignment.findOne({student: req.user.id,assignment:req.params.id})
        .populate({ path: 'student', model: 'User' })
        .populate({ path: 'assignment', model: 'Assignment' });
        if(!view) return res.status(400).json({ message: "assignment not found for this student" })
        let foundAssign= await Assignment.findById(req.params.id);
        if(!foundAssign) return res.status(400).json({ message: "assignment not found" })
        let foundstd= await User.findById(req.user.id);
        if(!foundstd) return res.status(400).json({ message: "Student not found" })
        // if( view?.answers?.length !== 0) return res.status(400).json({ message: "you have already submitted the assignment" })
        if (view.assignment.totalQuestion !== req.body.answers?.length) 
        return res.status(400).json({ message: `total question is ${view.assignment.totalQuestion} you answer for ${req.body.answers?.length} question` });
        if (!view) return res.status(404).json({ message: "assignment not found for this student" });
        let score=0;
        view.assignment.question.map(async (question,index)=>{
            console.log(question);
            if(question.answer==req.body.answers[index].answer){
                score+=question.markForThisQuestion;
                console.log(question.markForThisQuestion+"mark");
            }
        })
        console.log(view+"v");
        console.log(req.body.answers);
        console.log(score+"score");
        
        await StudentAssignment.findByIdAndUpdate({_id: view._id},{$set:{answers: req.body.answers,scoredMarks:score}},{new:true});  
        await Assignment.findByIdAndUpdate({_id: view.assignment._id},{$push:{attendedStudents: view.student._id}},{new:true});
        res.status(200).json({ message: "answer submitted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const stdViewTheirAllAssign = async (req, res) => {
    try {
        const view = await StudentAssignment.find({student: req.user.id})
        .populate({path:"student",model:"User"}).populate({path:"assignment",model:"Assignment"});
        if (!view) return res.status(404).json({ message: "assignment not found" })
        // console.log(view[0].assignment.question);
        
        view.map((i)=>{
            i.assignment.question.forEach((question)=> {
                question.answer = "";
            })
        })
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const stdViewTheirParticularAssign = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: "please enter assignment id" });
        const view = await StudentAssignment.findOne({student: req.user.id,assignment:req.params.id})
        .populate({path:"student",model:"User"}).populate({path:"assignment",model:"Assignment"});
        if (!view) return res.status(404).json({ message: "assignment not found" });
        view.assignment.question.forEach((question)=> {
            question.answer = "";
        })
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const stdViewTheirParticularAssignWithAns = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: "please enter assignment id" });
        const view = await StudentAssignment.findOne({student: req.user.id,assignment:req.params.id})
        .populate({path:"student",model:"User"}).populate({path:"assignment",model:"Assignment"});
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const factViewTheirParticularAssign = async (req, res) => {
    try {
        if (!req.query.stdid) return res.status(400).json({ message: "please enter student id in query" });
        if (!req.query.assignid) return res.status(400).json({ message: "please enter assignment id in query" });
        const view = await StudentAssignment.findOne({student: req.query.stdid,assignment:req.query.assignid})
        .populate({path:"student",model:"User"}).populate({path:"assignment",model:"Assignment"});
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const factViewAllAssign = async (req, res) => {
    try {
        const view = await StudentAssignment.find()
        .populate({path:"student",model:"User"}).populate({path:"assignment",model:"Assignment"});
        if (!view) return res.status(404).json({ message: "assignment not found" });
        res.status(200).json({ data: view });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};