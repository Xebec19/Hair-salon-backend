import express from "express"
import passport from "passport"

import { profile } from '../../controllers/profile.controller';
const router = express.Router();
router.use(passport.initialize());
/**
 * @type GET
 * @path /api/profile/dashboard
 * @description allows to user to see his/her details
 * @access PRIVATE
 */
router.get("/dashboard", passport.authenticate("jwt", { session: true }), (req, res) => profile(req, res));

export default router;
