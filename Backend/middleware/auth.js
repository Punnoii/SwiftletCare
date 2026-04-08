import jwt from 'jsonwebtoken';

const verifyToken = (req,res,next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({status:'error',message:"Authentication required"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        res.status(401).json({status:'error',message:'Invalid token'});
    }
};

export {verifyToken};