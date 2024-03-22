const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');

module.exports = class SoldItemModel {


    static async create(data) {
        try {
            const createdAt = moment.utc().toISOString(); 
            const dataWithTimestamps = { ...data, created_at: createdAt }; 
            
            const statement = pgp.helpers.insert(dataWithTimestamps, null, 'sold_items') + ' RETURNING *';
            const result = await db.query(statement);
            
            return result.rows?.[0] || null;
        } catch (err) {
            throw new Error(err.message); 
        }
    }
    

    static async findOneByOrderId(order_id) {
        try{
        
            const statement = `SELECT *
                               FROM sold_items
                               WHERE order_id = $1`;
            const values = [order_id];
            
            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows
            }
          
            return null;
        
        } catch(err) {
            throw new Error(err);
        }
    } 
}