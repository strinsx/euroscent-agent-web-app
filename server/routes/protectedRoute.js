import { authMiddleware } from '../middleware/authmiddleware.js'
import express from 'express'

const router = express.Router();

router.get('/protect', authMiddleware, (req, res) => {
    res.json({message: "success!"})
})

export default router