import express from "express";

import { login, register } from '../../controllers/auth.controller';
const router = express.Router();

/**
 * @type POST
 * @path /public/auth/login
 * @description Logs in user
 * @access PUBLIC
 */
router.post("/login", (req, res) => login(req, res));

export default router;
