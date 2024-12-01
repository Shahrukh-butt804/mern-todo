export const asyncHandler = (func)=>{
    return (req,res,next)=>{
        Promise.resolve(func(req,res)).catch((err)=> next(err))
    }
} 