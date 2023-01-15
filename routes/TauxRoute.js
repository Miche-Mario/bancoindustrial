import express from 'express'
import {
    getTaux,
    createTaux,
    updateTaux,
    deleteTaux
} from "../controllers/Taux.js"

const router = express.Router();

router.get('/taux', getTaux);
router.patch('/taux/:id', createTaux);
router.delete('/taux/:id', updateTaux);
router.post('/taux', deleteTaux);




export default router;