const saveUser = async(data:Object) => {
    if(data.hasOwnProperty("email")){
        return await true;
    }
    else return await false;
};