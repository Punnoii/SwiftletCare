import { query } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ debug: true });

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req,res,next) => {
    try {
        const { firstname, surname, email, password, confirmPassword, meta = {} } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ status: "error", message: "Password not match" });
        }

        const [existingUser] = await query("SELECT * FROM Staff WHERE email = ?", [email]);

        if (existingUser) {
            return res.status(409).json({ status: "error", message: "Email already registered" });
        }

        // Hash
        const hashpassword = await bcrypt.hash(password,10);

        // store in DB
        await query(
            "INSERT INTO Staff (firstname, surname, email, password, meta) VALUES (?, ?, ?, ?, ?)",
            [firstname, surname, email, hashpassword, JSON.stringify(meta)]
        );

        res.json({status:'ok',message:'User registered success'});
    } catch (error){
        next(error);
    }
}

const login = async (req,res,next) => {
    try {
        const {email , password} = req.body;
        const [user] = await query("SELECT * FROM Staff WHERE email = ?", [email]);

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: "error", message: "Incorrect Password" });
        }

        const token = jwt.sign(
            { userID: user.id, email: user.email },
            JWT_SECRET
        );

return res.status(200).json({ status: "ok", data: token });

    } catch (error) {
        next(error);
    }
}

export {login , register};