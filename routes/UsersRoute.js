import express from 'express'
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByName,
    upload,
    updateIban
} from "../controllers/Users.js"
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';


const router = express.Router();

router.get('/users', getUsers);
router.post('/username', getUserByName);

router.post('/userget', getUserById);
router.post('/users', upload, createUser);
router.patch('/users/:id',upload, updateUser);
router.patch('/useriban/:id', updateIban);

router.delete('/users/:id', deleteUser );



export default router;