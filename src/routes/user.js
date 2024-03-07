const express = require('express')
const router = express.Router();
const UserService = require('../services/userService');

const UserServiceInstance = new UserService();

module.exports = (app) => {

    app.use('/users', router);

    router.get('/:userId', async (req, res, next) => {

        try {
            const {user_id} = req.params;

            const response = await UserServiceInstance.get({ id: user_id });
            res.status(200). send(response);
        } catch(err) {
            next(err);
        }
    });

    router.put('/:userId', async (req, res, next) => {
        try{
            const { user_id } = req.params;
            const data = req.body;

            const response = await UserServiceInstance.update( { id: user_id, ...data });
            res.status(200).send(response);
        } catch(err) {
            next(err);
        }
    });
    
}