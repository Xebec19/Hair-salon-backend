import bcrypt from 'bcryptjs'
import * as jsonwt from "jsonwebtoken"
import * as de from 'dotenv'
const dotenv = de.config();
import User from '../models/User'

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const check = await User.findOne({ email: email });
        if (!check) throw "No user found";
        try{
        bcrypt.compare(password, check.password, async (err, match) => {
            if (err) throw "Some error occured while checking password!";
            if (!match) res.status(400).json({message:"Password mismatch",status:400});
            else res.status(202).json({ message: "User found", status: 202 });
        });
    }
    catch(err){res.status(400).json({message:"Internal error!!",status: 400 })}
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "User not found!!", status: 404 })
    }
}

export const register = (req: any, res: any) => {

}