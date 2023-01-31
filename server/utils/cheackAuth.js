/* based on this cookes or token we need to varify our token */
import Jwt from "jsonwebtoken";
import createError from "./createError.js";
export default (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(createError({ status: 401, message: "Unauthorized Token Not found" }));
  }
  return Jwt.verify(token, process.env.JWT_SECRETE, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: "Invalid Token" }));
    }
    req.user = decoded;
    //adding user here in the decoded one we will hava a id if you remember in the decoded one we have id and data go userAuth.js cheack login you'll get payload from there we grabbed it.
    return next();
  });
};
