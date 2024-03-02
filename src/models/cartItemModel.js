const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

    constructor(data = {}) {

        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
      }

      static async create(data) {

        try {
           
            const newCartItem = new this.constructor(data);
            const dataWithTimestamps = { ...data, created_at: newCartItem.created_at };
       
            const statement = pgp.helpers.insert(dataWithTimestamps, null, 'cartItems') + ' RETURNING *';
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
            const {id, ...params} = updateCartItemData;
            const condition = pgp.as.format(`WHERE ${id} RETURNING *`, { id });
            const statement = pgp.helpers.update(params, null, 'cartItems') + condition;

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
                                    ci.qty,
                                    ci.id AS "cartItemId", 
                                    p.*
                                FROM "cartItems" ci
                                INNER JOIN products p ON p.id = ci."productId"
                                WHERE "cartId" = $1`
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
                               FROM "cartItems"
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