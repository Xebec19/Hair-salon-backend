import express from "express";

import { login, register } from '../../controllers/auth.controller';
const router = express.Router();

/**
 * @type POST
 * @path /public/auth/login
 * @description test response
 * @access PUBLIC
 */
router.post("/login", (req, res) => login(req, res));

/**
 * @type POST
 * @path /public/auth/register
 * @description It registers new users
 * @access PUBLIC
 */
router.post("/register",(req,res) => register(req,res));

export default router;
