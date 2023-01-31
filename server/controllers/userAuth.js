import User from "../models/user.js";
import bcrypthjs from "bcryptjs";
import jwtToken from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res,next) => {
  /*collect all info from fronted */
  const { name, email, password } = req.body;

  /* Validate the data, if exit*/
  if (!name || !email || !password) {
    return next(createError({ status: 400, message: "All fields are Required" }));

  }
  /*cheack user Already exit or not */
  const exitOrNot = await User.findOne({ email });
  if (exitOrNot) {
    res.status(401).send("user already exits");
  }

  try {
    /*encrypt the password */
    const salt = await bcrypthjs.genSalt(10);
    const hashPassword = await bcrypthjs.hash(password, salt);

    /* MongoDB Architecture
         save to DB and send a key(token) ||create new entrey in DB*/

    const newUser = await new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    newUser.password = undefined;
    return res.status(201).json({
      success: true,
      message: "user successfully add",
      newUser,
    });
  } catch (error) {
    // return res.json(`register server ${error}`);
    return next(`register ${error}`)   
  }
};

export const login = async (req, res, next) => {
  /*collect all info from from fronted side */
  const { email, password } = req.body;
  /*validate all info */
  if (!(email && password)) {
    // res.status(401).send("both field are required");
    return next(createError({status:400, message:"Both field are requied"}))
  }
  try {
    /*cheack if already in DB or not */
    const user = await User.findOne({ email }).select("name email password");
    if (!user) {
     return next(createError({status:404, message:"user not found"}))
    }
    /* cheack password is correct or not */
    const isPasswordcorrect = await bcrypthjs.compare(password, user.password);
    if (!isPasswordcorrect) {
      // return res.json("Password is incorrect");
      return next(createError({status:400, message: "Unauthorized login password"}))
    }
    /*If it is correct password in the case we will create a cookie for a user & will pass the cookes with responses
     */

    /* we need to create payload here what will be the in the cookies that's what the payload is .. */

    const payload = {
      id: user._id,
      name: user.name,
    };

    /*create a token pass payload into token then send to cookies */

    const token = jwtToken.sign(payload, process.env.JWT_SECRETE, {
      expiresIn: "1d",
    });
    // user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    };

    return res
      .cookie("token", token, options, {
        httpOnly: true,
        /* why it is http only true because no one can access this cookie from fronted accept server */
      })
      .status(200)
      .json({
        success: true,
        message: "successfully login",
        user,
        token,
      });

      /* Now using this cookie we can varify any kind of cookies in middleware/utlis weather it is logged in user or not*/

  } catch (error) {
    return next(`login ${error}`)
  }
};

export const logout = async(req,res)=>{
res.clearCookie("token");
return res.status(200).json({message:"Successfully logout"});
}

export const isLoggedIn = async(req,res)=>{
  const {token} = req.cookies
  if(!token){
    return res.json(false);
  }
  return jwtToken.verify(token, process.env.JWT_SECRETE, (err)=>{
    if(err){
      return res.json(false)
    }
    return res.json(true)
  })
}

