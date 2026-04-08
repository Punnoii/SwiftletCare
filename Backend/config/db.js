import mysql from "mysql2/promise";
import express from "express";
// .env
import dotenv from 'dotenv';
dotenv.config({debug:true}); // add debug:true to see if .env is loaded correctly

const router = express.Router();

let pool;


const connectDB = async () => {
    try {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    await pool.query('SELECT 1');
    console.log('MySQL connect');
    return pool;

    } catch (error) {
        console.error("Failed: ",error);
        throw error;
    }
};

const query = async (sql,params) => {
    try{
        const [rows] = await pool.execute(sql,params);
        return rows;
    } catch (error) {
        console.error("Query error: " , error);
        throw error;
    }
};

export {connectDB , query};



