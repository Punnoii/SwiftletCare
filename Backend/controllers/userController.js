import query from "../config/db";
import bcrypt from "bcryptjs";

// .env
import dotenv from 'dotenv';
dotenv.config({debug:true}); // add debug:true to see if .env is loaded correctly

const getAllUsers = async (req , res , next) => {
    try {
        const users = await query('SELECT * FROM Staff');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUser = async (req , res , next) => {
    try {
        const [user] = await query(
            'SELECT * FROM Staff WHERE id = ?', [req.params.id]
        );
        if (!user) return res.status(404).json({status:"error",message:'User not found'});
        res.json({status:"success",data:user});
    }catch (error) {
        next(error);
    }
};

// look like registor ?
const createUser = async (req ,res , next) => {

    try {
        const {firstname, surname, email, password, confirmPassword} = req.body;
        if (password != confirmPassword){
            return res.status(409).send({message: "Passwords do not match"}); 
        }

        const hashpassword = await bcrypt.hash(password,10);

        const result = await query(
            'INSERT INTO Staff (firstname,surname,email,password,meta) VALUES (?,?,?)',
            [firstname, surname,  email, hashpassword, JSON.stringify(meta)]
        );
        res.status(201).json({status : "ok" , message: "User created successfully"});
    } catch (error) {
        next(error);
    }
}

// in develop
const updateUser = async (req, res, next) => {

    try {
        const {firstname, surname, email, password, meta} = req.body;
        const hashpassword = await bcrypt.hash(password,10);
        const result = await query(
            'UPDATE Staff SET firstname = ? , surname = ? , email = ? , password = ?'
            [firstname,surname,email,hashpassword]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({status:"error",message:"User not found"});
        }
    } catch (error) {
        next(error)
    }
};

// in develop
const deleteUser = async (req,res,next) => {

    try {
        const result = await query (
            'DELETE FROM Staff WHERE id = ?'
            [req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({status:"error" , message:"User not found"});
        }
        res.json({status:"ok"})
    } catch (error) {
        next(error);
    }
};

export {getAllUsers,getUser,createUser,updateUser,deleteUser};
