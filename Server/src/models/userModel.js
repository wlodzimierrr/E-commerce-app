const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');
const bcrypt = require('bcrypt');


module.exports = class UserModel {

    constructor(data = {}) {

      this.created_at = data.created_at || moment.utc().toISOString();
      this.updated_at = moment.utc().toISOString();
    }
  
    async create(data) {
        try {
             if (data.password) {
             const saltRounds = 10;
             data.password = await bcrypt.hash(data.password, saltRounds);
             }
            
             const newUser = new this.constructor(data);
             const dataWithTimestamps = { ...data, created_at: newUser.created_at };
        
             const statement = pgp.helpers.insert(dataWithTimestamps, null, 'users') + ' RETURNING *';
             const result = await db.query(statement);
        
             if (result.rows?.length) {
             return result.rows[0];
             }
             return null;
        
          } catch(err) {
            throw new Error(err);
         }
     }
      
  
      async update(data) {
        try {
             if (data.password) {
             const saltRounds = 10;
             data.password = await bcrypt.hash(data.password, saltRounds);
             }
          
             const updatedData = { ...data, updated_at: moment.utc().toISOString() };
             const { user_id, ...params } = updatedData;
             const condition = pgp.as.format('WHERE user_id = ${user_id} RETURNING *', { user_id }); 
             const statement = pgp.helpers.update(params, null, 'users') + condition;
          
             const result = await db.query(statement);
          
             if (result.rows?.length) {
               return result.rows[0];
             }
          
             return null;
          } catch(err) {
             throw new Error(err);
         }
     }
      
  
    async findByEmail(email) {
        try{

            const statement = `SELECT *
                               FROM users
                               WHERE email = $1`;
            const values = [email];

            const result = await db.query(statement, values);

            if(result.rows?.length) {
                return result.rows[0]
            }
            
            return null;
        } catch(err) {
            throw new Error(err);
        }
    }

    async findOneById(user_id) {
        try{
            
            const statement = `SELECT *
                               FROM users
                               WHERE user_id = $1`;
            const values = [user_id];

            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;
        
        } catch(err) {
            throw new Error(err);
        }
    }

    
    async findOneByUsername(username) {
        try{

            const statement = `SELECT *
                               FROM users
                               WHERE username = $1`;
            const values = [username];

            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;
        
        } catch(err) {
            throw new Error(err);
        }
    } 
};

