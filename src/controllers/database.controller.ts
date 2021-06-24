import User from '../models/User'
import bcrypt from 'bcryptjs'
export const saveUser = async (data: {name:any,email:any,password:any}) => {
    var flag;
    var message;
    const {name,email,password} = data;
    console.log(data);
    try {     
        const check = await User.findOne({email:`${email}`});
        if(check) throw "User already registered"
        bcrypt.hash(password, 8, async(err, hash) => {
            if(err) throw err;
            const newUser = new User({email:email,name:name,password:hash});
            const result = await newUser.save();
            message = "User successfully registered";
            flag = true;
        });
    }
    catch (err) {
        console.log(err);
        message = "Error while registering user : " + err; 
        flag = false;
    }
    return {message:message, status:flag};
};
export const checkUser = async (data: { email: any, password: any }) => {
    const { email, password } = data;
    var flag;
    var message;
    try {
        const result = User.findOne({email: email});
        if(!result) throw "User not registered";
        bcrypt.compare(password, result.password, async(err, res) => { 
            if(err) throw "Incorrect password" + err;
            message = "Successfully logged in"
            flag = true;
        });
    }
    catch (error) {
        console.log(error);
        message = "User could not be logged in " + error;
        flag = false;
    }
    return {message:message, status:flag};
}