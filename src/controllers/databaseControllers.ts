import User from '../models/User'

export const saveUser = async (data: any) => {
    const newUser = new User({
        name: data.name,
        email: data.email,
        password: data.password
    });
    try {
        const result = await newUser.save();
        console.log(result);
        return true;
    }
    catch (err) {
        console.log('Snap! Can not save record!!! ', err);
        return false;
    }
}
