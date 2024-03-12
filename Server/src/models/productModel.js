const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');

module.exports = class ProductModel {

    async find(options={}) {
        try{

            const statement = `SELECT *
                               FROM products`;
            const values = [];

            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows;
              }
        
              return [];
              
        } catch(err) {
            throw err;
        }
    }

    async findOne(id) {
        try{

            const statement = `SELECT *
                               FROM products
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

    static async update(data) {

        try{
            const { id, ...params } = data;
            const updateProductQuantity= { ...data, updated_at: moment.utc().toISOString() };
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(updateProductQuantity, null, 'products') + condition;

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }
            
            return null;

        } catch(err) {
          throw new Error(err);
        }
    }

};