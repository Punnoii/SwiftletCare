import express from 'express';
import userController from '../controllers/userController.js';
const { verifyToken } = require('../middleware/auth.js');
const router = express.Router();

// use middleware to check that user has already login
router.use(verifyToken);

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.updateUser);

router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export {router};