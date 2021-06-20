import express from "express";
import * as jsonwt from "jsonwebtoken";
const router = express.Router();

/**
 * @type GET
 * @path /public/auth/login
 * @description test response
 * @access PUBLIC
 */
router.post("/login", async (req: any, res: any) => {
  const { email, password } = req.body;
  const payload = {
    email: email,
    password: password
  }
  jsonwt.sign(
    payload,
    "secret",
    { expiresIn: '1d' },
    (err, token) => {
      if (err)
        res.status(401).json({ message: "Something broke!!!", error: err })
      res.status(201).json({ message: "Success", token: "Bearer " + token})
    }
  )
})

export default router;
