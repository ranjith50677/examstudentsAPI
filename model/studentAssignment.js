import mongoose, { Mongoose } from "mongoose";

const studentAssignment =  new mongoose.Schema({
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    answers:[
        {
            questionNo : {
                type: Number,
            },
            answer : {
                type: String,
            }
        }
    ],
    scoredMarks:{
        type:Number,
        default:0
    }
},  {
    timestamps: true
}
)

const StudentAssignment=mongoose.model('StudentAssignment',studentAssignment)
export default StudentAssignment;