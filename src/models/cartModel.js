const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class cartModel {

    constructor(data = {}) {

        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isActive = data.isActive || true;
      }

    async create(userId) {
        try {
        
            const data = { userId, ...this}    
            const newCart = new this.constructor(data);
            const dataWithTimestamps = { ...data, created_at: newCart.created_at };
      
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

    async findOneByUser(userId) {
        try{

            const statement = `SELECT *
                               FROM carts
                               WHERE "userId" = $1`;
            const values = [userId];

            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;
        
        } catch(err) {
            throw err;
        }
    }

    async findOneById(id) {
        try{

            const statement = `SELECT *
                               FROM carts
                               WHERE id = $1`;
            const values = [id];

            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;
        
        } catch(err) {
            throw err;
        }
    } 
};