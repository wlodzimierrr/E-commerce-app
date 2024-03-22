const createError = require('http-errors');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel();

module.exports = class UserServices {
    
    async get(data) {
        const { id } = data
        try {

            const user = await UserModelInstance.findOneById(id)

            if(!user) {
                throw createError(404, 'User record not found');
            }

            return user;

        } catch (err){
            throw err;
        }
    };

    async update(data) {

        try{

            const user = await UserModelInstance.update(data);

            return user;

        } catch(err) {
            throw err;
        }

    };

    

}