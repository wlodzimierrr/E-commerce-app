const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });


module.exports = class OrderItemModel {

    constructor(data = {}) {
        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
        this.price = data.price || 0;
        this.product_id = data.id;
        this.quantity = data.quantity || 1;
        this.orders_id = data.orders_id || null;
    }

    static async create(data) {

        try {
            const statemnt = pgp.helpers.insert(data, null, 'order_items') + 'RETURNING *';

            const result = await db.query(statemnt);

            if (result.rows?.length) {
                return result.rows[0];
            }
        
              return null;
        
        } catch(err) {
              throw new Error(err);
            }
    }

    static async find(order_id) {

        try { 

            const statement =`SELECT 
                                    oi.qty,
                                    oi.id AS "id", 
                                    p.*
                            FROM "order_items" oi
                            INNER JOIN products p ON p.id = oi."product_id"
                            WHERE "order_id" = $1`
            const values = [order_id];

            const result = await db.query.query(statement, values);
            
            if (result.rows?.length) {
                return result.rows;
              }
        
              return [];
        
        } catch(err) {
              throw new Error(err);
            }
    }
        
}