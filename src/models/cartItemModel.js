const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');

module.exports = class CartItemModel {

    constructor(data = {}) {

        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
      }

      static async create(data) {
        try {

            const dataWithTimestamps = { ...data, created_at: moment.utc().toISOString() };
       
            const statement = pgp.helpers.insert(dataWithTimestamps, null, 'cart_items') + ' RETURNING *';
            const result = await db.query(statement);
       
            if (result.rows?.length) {
            return result.rows[0];
            }
            return null;
       
        } catch(err) {
           throw new Error(err);
        }
    }

    static async update(id, data) {

        try{
            const updateCartItemData = { ...data, updated_at: moment.utc().toISOString() };
            const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
            const statement = pgp.helpers.update(updateCartItemData, null, 'cart_items') + condition;

            const result = await db.query(statement);

            if (result.rows?.length) {
                return result.rows[0];
            }
            
            return null;

        } catch(err) {
          throw new Error(err);
        }
    }

    static async find(cartId){

        try{

            const statement = `SELECT 
                                    ci.quantity,  
                                    ci.id AS "id", 
                                    p.*
                                FROM "cart_items" ci
                                INNER JOIN products p ON p.id = ci.product_id  
                                WHERE ci.cart_id = $1`;  


            const values = [cartId]
            const result = await db.query(statement, values)
            
            if (result.rows?.length){
                return result.rows;
            }

            return [];

        } catch(err) {
            throw new Error(err);
        }
    }

    static async delete(id) {

        try{
            
            const statement = `DELETE
                               FROM "cart_items"
                               WHERE id = $1
                               RETURNING *`;
            const values = [id];

            const result = await db.query(statement, values)

            if (result.row?.length) {
                return result.rows[0];
            }

            return null;

        } catch(err) {
            throw new Error(err);
        }
    }


}