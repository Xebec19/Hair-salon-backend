import bcrypt from 'bcryptjs'
import * as jsonwt from "jsonwebtoken"
import * as de from 'dotenv'
const dotenv = de.config();
import { saveUser, checkUser } from './database.controller';

export const login = async (req: any, res: any) => {
    var result = await checkUser(req.body);
    if (result === true) {
        console.log('The value of result ', result);
        res.status(201).json({ status: true });
    } else res.status(401).json({ status: false });
}

export const register = async (req: any, res: any) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const result = await saveUser(data);
    if (result === true) {
        res.status(201).json({ status: true });
    }
    res.status(401).json({ status: false });

}