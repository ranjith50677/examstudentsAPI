import mongoose from "mongoose";

const assignment = new mongoose.Schema(
    {
        assignmentTitle: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        class: {
            type: Number,
            required: true,
        },
        question: [
            {
                questionNo : {
                    type: Number,
                    required: true,
                },
                question : {
                    type: String,
                    required: true,
                },
                options:[
                    {
                        optionNo : {
                            type: Number,
                            required: true,
                        },
                        optionAns : {
                            type: String,
                            required: true,
                        },
                    }
                ],
                answer : {
                    type: String,
                    required: true,
                },
                markForThisQuestion : {
                    type: Number,
                    required: true,
                }
            },
        ],
        totalMarks : {
            type: Number,
            required: true,
        },
        totalQuestion : {
            type: Number,
            required: true,
        },
        attendedStudents : [
            {
                studentId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Assignment = mongoose.model("Assignment", assignment);
export default Assignment;
