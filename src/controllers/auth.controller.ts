import bcrypt from 'bcryptjs'
import * as jsonwt from "jsonwebtoken"
import * as de from 'dotenv'
const dotenv = de.config();
import { saveUser, checkUser } from './database.controller';

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    }
    const result: { message: string | any, status: boolean | any } = await checkUser(data);
    if (result.status) res.status(201).json({ message: result.message, status: result.status });
    else res.status(401).json({ message: result.message, status: result.status });
}

export const register = async (req: any, res: any) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const result: { message: any, status: any } = await saveUser(data);
    if (result.status) {
        res.status(201).json({ message: result.message, status: result.status });
    }
    else res.status(401).json({ message: result.message, status: result.status });

}