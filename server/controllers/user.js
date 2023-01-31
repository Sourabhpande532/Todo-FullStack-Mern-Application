import User from "../models/user.js"
/* @strategies(getUserInfo)
    we want user Id we will get user data by user Id from where we can get our user id/or Data go utlis/cheack auth you will get at line No. 13 from where we've to collect if you go in routes/main.js befour to go to userRoute it will authenticate 
    further more in cheakAuth at line no.13 adding user here in the decoded one we will hava a id if you remember in the decoded one we have id and data go userAuth.js cheack login you'll get payload from there we grabbed it.
    @furthermore might be one question came in your mind why I not mentions _id in req.user.id here go and explore login route you will get paylod and see key: value we use exacty key here */

export const getUserInfo = async(req, res, next)=>{
try {
const data = await User.findById(req.user.id).select("name email");
return res.status(200).json(data);    
}catch (error) {
   next(error) 
}     
}

export const updateUser = async(req,res,next)=>{
 try {
 const updateUser = await User.findByIdAndUpdate(req.user.id, {
 name: req.body.name,
 email:req.body.email,
 },{
    new: true
    /*When the user is updated so we don't need to refresh for show message i.e */
 }
 ).select("name email")
 return res.status(200).json(updateUser)      
 } catch (error) {
   next(error) 
 }
}