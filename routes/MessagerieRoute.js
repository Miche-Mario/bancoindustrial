import express from 'express'
import {
    getMessageByUserId,
    getAdminMessage,
   getUserMessage,

    createMessageAdmin,
    createMessageUser,
    createReport,
    updateMessagerie,
    getNumAdminMessage,
    getNumUserMessage
} from "../controllers/Messagerie.js"

const router = express.Router();

router.get('/getAdminMessage', getAdminMessage);

router.get('/getNumAdminMessage', getNumAdminMessage);

router.post('/getMessageByUserId', getMessageByUserId);
router.post('/getUserMessage', getUserMessage);

router.post('/getNumUserMessage', getNumUserMessage);

router.post('/createMessageAdmin', createMessageAdmin);
router.post('/createMessageUser', createMessageUser);
router.post('/createReport', createReport);

router.patch('/updateMessagerie', updateMessagerie);






export default router;