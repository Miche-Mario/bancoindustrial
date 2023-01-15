import express from 'express'
import {
    getTransaction,
    createTransaction,
    updateTransaction,
    getTransactionByUser
} from "../controllers/Transaction.js"

const router = express.Router();

router.get('/transaction', getTransaction);
router.post('/transactionuser', getTransactionByUser)
router.post('/transaction', createTransaction)
router.get('/transaction/:id', updateTransaction);




export default router;