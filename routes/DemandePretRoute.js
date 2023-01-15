import express from 'express'
import {
    getDemandePret,
    createDemandePret,
    updateDemandePret,
    getDemandePretUser
} from "../controllers/DemandePret.js"

const router = express.Router();

router.get('/dpret', getDemandePret);
router.post('/dpret', createDemandePret)
router.post('/dpretuser', getDemandePretUser)
router.patch('/dpret/:id', updateDemandePret);




export default router;