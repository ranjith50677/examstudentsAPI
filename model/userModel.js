import mongoose from "mongoose";

const user =  new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
    },
    isFaculty:{
        type:Boolean,
        default:false
    },
    assignments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Assignment"
        }
    ],
    class:{
        type:Number
    },    
},  {
    timestamps: true
}
)

const User=mongoose.model('User',user)
export default User;