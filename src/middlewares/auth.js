import { User } from '../models/index.js';
import { SECRET } from "../config/index.js";
import verify  from "jsonwebtoken";


const AuthMiddleware = async (req, res, next) => {
    // console.log("Auth header: ",req.headers.authorization,"\n\n")

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.isAuth = false;
        req.user=null;
        return next();
    };

    // console.log({"Host: ":req.headers.host})

    console.log({"Headers: ":req.headers})

    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
        req.isAuth = false;
        req.user=null;
        return next();
    };

    let decodedToken;
    try{
        decodedToken = verify(token, SECRET);
    }catch(error){
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    };

    let authUser= await User.findById(decodedToken.id);

    if(!authUser){
        req.isAuth = false;
        return next();
    }

    req.user=authUser;
    req.isAuth = true;
    // console.log(req);
    // console.log("!!!!!------------------------------------------------------------!!!!!!!!!")

    return next();
};

export default AuthMiddleware;
