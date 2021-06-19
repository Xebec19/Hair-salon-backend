import express from 'express';
const router = express.Router();

/**
 * @type GET
 * @path /public/start
 * @description test response
 * @access PUBLIC
 */
router.get('/',(req:any,res:any) => res.status(201).json({message:"ping ping ping"}));

export default router;