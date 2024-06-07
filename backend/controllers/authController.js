import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//validate password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

//user register
export const register = async (req, res) => {
    const { password, photo } = req.body;

    if (!validatePassword(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
        });
    }

    try {
        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo
        });

        await newUser.save();

        res.status(200).json({ success: true, message: "Successfully registered!" });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            // Duplicate email error
            return res.status(400).json({ success: false, message: "Email is already registered" });
        }
        return res.status(500).json({ success: false, message: "Failed to register!" });
    }
}

//user login
//user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        //if user does not exist
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not found" });
        }

        //if user exists
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const { password: userPassword, role, ...rest } = user._doc;

        //create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        //set Token in the browser cookie
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // cookie will expire in 7 days
        }).status(200).json({ token, data: { ...rest }, role });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to login!", error: error.message });
    }
}
