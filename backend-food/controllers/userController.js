import userModel from "../models/userModels.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// - JWT token that can be used for authentication and authorization, that represents a user’s identity 

// login user
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        // Find user by email
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User doesn't exist"});
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid password"});
        }

        // Create and return token
        const token = createToken(user._id);
        res.json({success: true, token});
    } 
    catch(error) {
        console.error("Login error:", error);
        res.json({success: false, message: error.message});
    }
}

// create token
const createToken = (id) => {  // createToken -> - is a function that takes a user’s id as input.
    return jwt.sign({id}, process.env.JWT_SECRET)  // creates a signed token.  process.env.JWT_SECRET this is secret token in .env
}

// registered user
const registeredUser = async(req, res) => {
    const {name, password, email} = req.body;
    try{
        // checking if user already exist
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success: false, message:"User already exist"});
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){  //- This uses the validator library (a popular npm package in Node.js) to check if the string stored in email.
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if(password.length < 8){
            return res.json({success: false, message: "Please enter strong password"})
        }  
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token})

    }
    catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {loginUser, registeredUser}

/*
    - Salt is a random string added to the password before hashing.
    genSalt - - means bcrypt will generate a salt with a cost factor of 10.
    bcrypt.hash - takes the plain password and the salt, then produces a hashed version.
 */

/*  JWT 
   payload{id} = this is the data embedded inside the token. In this case, only the user’s ID.
 */