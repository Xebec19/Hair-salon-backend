import User from '../models/User'
import bcrypt from 'bcryptjs'
export const saveUser = async (data: {name:any,email:any,password:any}) => {
    const {name,email,password} = data;
    try {     
        const check = await User.findOne({email:`${email}`});
        if(check) throw "User already registered"
        bcrypt.hash(password, 8, async(err, hash) => {
            if(err) throw err;
            const newUser = new User({email:email,name:name,password:hash});
            const result = await newUser.save();
            console.log('Success');
        });
    }
    catch (err) {
        console.log(err);
        return false;
    }
    return true;
};
export const checkUser = async (data: { email: any, password: any }) => {
    const { email, password } = data;
    try {
        const check = await User.findOne({email: email});
        console.log('The value is ',check);
        if(!check) throw "User not registered";
        console.log(check.password,password);

        bcrypt.compare(password, check.password, async(err, boo) => { 
            if(err) return false;
            if(!boo){ 
                console.log('Fired');
                return 0;
            }
        });

    }
    catch (error) {
        console.log('Failure');
        return false;
    }
    return true;
}