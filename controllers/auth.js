import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../models/UserDetails.js";

// REGISTER USER

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            imgPath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            imgPath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impresion: Math.floor(Math.random() * 1000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (err) {
        res.status(500).json({error: err.message });
    }
};

// LIGGING IN

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({error: err.message });
    }
}