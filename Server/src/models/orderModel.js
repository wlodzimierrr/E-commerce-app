const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });
const OrderItemModel = require('./orderItemModel');

module.exports = class OrderModel {

    constructor(data = {}) {
        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
        this.items = data.items || [];
        this.status = data.status || 'PENDING'
        this.total_amount = data.total || 0;
        this.user_id = data.user_id || null;
    }

    addItems(items) {
        this.items = items.map(item => new OrderItemModel(item));
    }

    async create () {

        try{

            const { items, ...order } = this;

            const statement = pgp.helpers.insert(order, null , 'orders') + ' RETURNING *';

            const result = await db.query(statement);

            if (result.rows?.length) {

                Object.assign(this, result.rows[0]);
    
                return result.rows[0];
            }
    
            return null;
    
        } catch(err) {
          throw new Error(err);
        }
    }

    async update(data){

        try{

            const condition = pgp.as.format('WHERE id=${id} RETURNING *', {id: this.id});
            const statement = pgp.helpers.update(data, null, 'orders') + condition

            const result = await db.query(statement);

            if (result.rows?.length) {
              return result.rows[0];
            }
      
            return null;
      
          } catch(err) {
            throw new Error(err);
          }
        }
    
    static async findByUser(user_id) {

        try {

            const statement = `SELECT *
                              FROM orders
                              WHERE "userId" = $1`;
            const values = [user_id];

            const result = await db.query(statement, values);
            if (result.rows?.length) {
                return result.rows[0];
              }
        
              return null;
        
            } catch(err) {
              throw new Error(err);
            }
        }
    
    static async findById(order_id) {

        try{

            const statement = `SELECT *
                               FROM orders
                               WHERE id = $1`;
            const values = [order_id];
            
            const result = await db.query(statement, values);

            if (result.rows?.length) {
                return result.rows[0];
              }
        
              return null;
        
            } catch(err) {
              throw new Error(err);
            }
        }
        
}