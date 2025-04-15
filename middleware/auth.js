import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

async function auth(req,res,next){ 
    const token=req.header('token')  
    if(!token) return res.status(403).json({message:"forbidden - token is unavailable"}) 
    try {
        const decoded=jwt.verify(token,process.env.JWT)
        req.user=decoded
        // console.log(decoded);
        let getOwner=await User.findById({_id:req.user.id}).select("isFaculty")
        req.user={...req.user,isFaculty:getOwner.isFaculty}
        next(); 
    } catch (error) { 
        if (error.message === 'jwt malformed') return res.status(401).json({message:'invalid token or '+error.message})
        res.status(401).json({message:error.message})
    }
}

export default auth;