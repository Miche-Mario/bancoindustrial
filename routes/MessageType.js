import express from 'express'
import {
    getMessageType,
    createMessageType,
} from "../controllers/MessageType.js"

const router = express.Router();

router.get('/msgtype', getMessageType);
router.patch('/msgtype/:id', createMessageType);



export default router;