import bcrypt from 'bcryptjs'
import * as jsonwt from "jsonwebtoken"
import * as de from 'dotenv'
const dotenv = de.config();
import User from '../models/User'

/**
 * @type POST
 * @path /public/auth/login
 * @description Logs in user
 * @access PUBLIC
 */
export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const check = await User.findOne({ email: email });
        if (!check) throw "No user found";
        try {
            if (!password) throw "Password required";
            bcrypt.compare(password, check.password, async (err, match) => {
                if (err) throw "Some error occured while checking password!";
                if (!match) res.status(400).json({ message: "Password mismatch", status: 400 });
                else {
                    console.log('--success user logged in');
                    try {
                        const payload = {
                            id: check.id,
                            name: check.name,
                            email: check.email,
                        }
                        jsonwt.sign(payload, JSON.stringify(process.env.SECRET), { expiresIn: '180d' }, async (err, token) => {
                            if (err || !token) throw "Error occurred while generating token";
                            if (token)
                                res.status(202).json({ message: "User found", token: "Bearer " + token, status: 202 });
                        })

                    }
                    catch (error) {
                        console.log(error);
                        res.status(413)
                    }

                }
            });
        }
        catch (err) { res.status(400).json({ message: "Internal error!!", status: 400 }) }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "User not found!!", status: 404 })
        return;
    }


}

/**
 * @type POST
 * @path /public/auth/register
 * @description It registers new users
 * @access PUBLIC
 */
export const register = async (req: any, res: any) => {
    let { name, email, password } = req.body;
    try {
        const check = await User.findOne({ email: email });
        if (check) throw "User already registered!!";
        else {
            try {
                bcrypt.hash(password, 8, async (err, hash) => {
                    if (err) throw "Error ocurred while hashing password";
                    if (hash) {
                        password = hash;
                        try {
                            const saveUser = await new User({
                                name: name,
                                email: email,
                                password: password
                            }).save();
                            console.log('--success user registered successfully');
                            res.status(201).json({ message: "User registered successfully", status: 201 });
                            return;
                        }
                        catch (error) {
                            console.log('--error error occured while saving user', error);
                            res.status(400).json({ message: "Error", status: 400 });
                            return;
                        }
                    }
                });
            }
            catch (error) {
                console.log('--error error occured while hashing password', error);
                res.status(422).json({ message: "Error", status: 422 });
                return;
            }
        }
    }
    catch (error) {
        console.error('--error user already registered', error);
        res.status(412).json({ message: error, status: 412 });
        return;
    }
}