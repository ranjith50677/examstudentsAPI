const isFaculty=(req,res,next)=>{
    if(!req.user.isFaculty) 
        return res.status(403).json({message:"Access denied your not right person to this action"})
    next()
}

export default isFaculty