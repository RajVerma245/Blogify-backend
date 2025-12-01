import { getUser } from "../config/userauth.js";

function checkAuthentication(cookieName) {
    return async (req, res, next) => {
        const tokenValues = req.cookies?.[cookieName];
        if(!tokenValues) {
            req.user = null;
            return next();
        }
      
       try {
            const userPayload =  await getUser(tokenValues);
            // console.log("User data :", userPayload)
            if(!userPayload){
                res.clearCookie(cookieName);
                req.user = null;
                return next()
            }

            req.user = userPayload;
            // console.log("auth-middleware: userID ",req.user);

       } catch (err) {
          res.clearCookie(cookieName);
        //   console.log("Auth error : ", err );
       }

      next();
    }
}

export {checkAuthentication};