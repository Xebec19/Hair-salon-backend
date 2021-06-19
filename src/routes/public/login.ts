import express from 'express';
import * as jsonwt from 'jsonwebtoken';
const router = express.Router();

/**
 * @type GET
 * @path /public/auth/login
 * @description test response
 * @access PUBLIC
 */
router.get('/login', async (req: any, res: any) => {
    res.status(201).json({message:"Route activated"});
});

export default router;