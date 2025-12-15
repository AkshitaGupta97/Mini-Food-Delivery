import jwt from "jsonwebtoken"

//- Defines an asynchronous middleware function that takes the usual Express parameters: req, res, next
const authMiddleware = async (req, res, next) => {
    // Accept token either in `Authorization: Bearer <token>` or `token` header
    const authHeader = req.headers.authorization || req.headers.token; // It first checks if the request has an authorized header
    let token = authHeader;
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized - token missing" });
    }
    // If header is like "Bearer <token>", extract the token part
    if (typeof token === 'string' && token.startsWith('Bearer ')) {  // - This code checks if the header starts with "Bearer"
        token = token.split(' ')[1];  // if yes, it splits the string by space and takes the second part  / Bearer abc123 -> abc123
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user info safely. Don't assume req.body exists; use req.user and req.userId
        req.user = req.user || {}; 
        // token payload may contain id, _id or userId depending on generation
        req.user.id = token_decode.id || token_decode._id || token_decode.userId;
        // convenience top-level property
        req.userId = req.user.id;
        return next();
    } catch (error) {
        console.error('Auth error:', error.message || error);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
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