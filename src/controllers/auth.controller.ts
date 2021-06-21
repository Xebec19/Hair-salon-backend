import bcrypt from 'bcryptjs'
import * as jsonwt from "jsonwebtoken"
import * as de from 'dotenv'
const dotenv = de.config();
import { saveUser } from './database.controller';

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    const payload = {
        email: email,
        password: password
    }
    jsonwt.sign(
        payload,
        `$(process.env.SECRET)`,
        { expiresIn: '180d' },
        (err, token) => {
            res.status(201).json({
                token: "Bearer " + token
            })
        }
    )
}

export const register = async (req: any, res: any) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 8, function (err, hash) {
        if (err) console.log(err);
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        }
        if (saveUser(data)) {
            res.status(201).json({ message: "Successfully registered", status: true });
        }
        else res.status(401).json({ message: "User not registered", status: false });
    });

}