const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');

module.exports = class CartModel {

    constructor(data = {}) {

        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
        this.converted = data.converted || null;
        this.isactive = data.isactive || true;
      }

    async create(user_id) {
        try {
            const data = { user_id, ...this}  
            console.log(data)
            const newCart = new this.constructor(data);
            const dataWithTimestamps = { ...data, created_at: newCart.created_at};
            const statement = pgp.helpers.insert( dataWithTimestamps, null, 'carts') + ' RETURNING *';
            const result = await db.query(statement);
      
            if (result.rows?.length) {
            return result.rows[0];
            }
            return null;
      
        } catch(err) {
          throw new Error(err);
        }
      }

    static async findOneByUser(userId) {
        try{

            const statement = `SELECT *
                               FROM carts
                               WHERE "user_id" = $1`;
            const values = [userId];
            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0]
            }
          
            return null;
        
        } catch(err) {
            throw new Error(err);
        }
    }

    static async findOneById(id) {
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
            throw new Error(err);
        }
    } 
};