import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
    try {
        
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });

        await newUser.save();

        res.status(200).json({success:true, message:"Successfully registered!"})

    } catch (error) {
        res.status(500).json({success:true, message:"Failed to register!"})
    }
}

//user login
export const login = async (req, res) => {

    const email = req.body.email;

    try {
        const user = await User.findOne({email});

        //if user does not exist

        if(!user){
            return res.status(404).json({success:false, message:"User does not found"});
        }

        //if user exist
        const checkPassword = await bcrypt.compare(req.body.password, user.password);

        if(!checkPassword){
            return res.status(401).json({success:false, message:"Invalid email or password"});
        }

        const {password, role, ...rest} = user._doc;

        //create JWT token
        
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{expiresIn:"7d"});

        //set Token in the browser cookie
        res.cookie('access_token', token, {
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({token, data: { ...rest },role});

    } catch (error) {
        return res
            .status(500)
            .json({success:false, message:"Failed to login!",error:error.message
        });
    }
}