const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserModel = require('../models/userModel');
const UserModelInstance = new UserModel()

module.exports = class AuthService {

    async register(data) {
        
        const { email } = data;

        try{
            const user = await UserModelInstance.findByEmail(email);

            if (user) {
                throw createError(409, 'Email already in use');
            }

            return await UserModelInstance.create(data);
        } catch(err) {
            throw createError(500, err)
        }
    };

    async login(data) {
        const { email, password } = data;

        try {
            const user = await UserModelInstance.findByEmail.apply(email)

        if (!user) {
            throw createError(401, 'Incorrect username or password');
        }

        if (user.password !== password){
            throw createError(401, 'Incorrect username or password')
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
        
        } catch(err) {
        throw createError(500, err);
        }
    };
}
