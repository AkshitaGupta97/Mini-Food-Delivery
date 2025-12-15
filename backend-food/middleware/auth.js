import jwt from "jsonwebtoken"

//- Defines an asynchronous middleware function that takes the usual Express parameters: req, res, next
const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
     
    if(!token){
        return res.json({success:false, message: "Not authorized"});
    }
    try{  // jwt.verify -> checks the token against your secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // it attach the userId to token id
        next();
    }
    catch(error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export default authMiddleware;

/* Json web token
    A JSON Web Token (JWT) is a compact, secure way to transmit information between two parties, most often used for authentication in web applications and APIs
    A JWT has three parts, separated by dots(.)
    - Header
    - Contains metadata, such as the type of token{JWT} and the signing algorithm (HS256)

    - Payload
    - Holds the claims (data being transmitted).
    - Claims can be:
        - Registered claims: Standard fields like

        - Signature
        - Created by combining the header and payload, then signing with a secret key or private key.

        e.g -> xxxxx.yyyyy.zzzzz

 */