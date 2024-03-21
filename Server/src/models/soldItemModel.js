const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });
const moment = require('moment');

module.exports = class SoldItemModel {

    constructor() {

        this.created_at = data.created_at || moment.utc().toISOString();
        this.updated_at = moment.utc().toISOString();
      }

      static async create(data) {
        try {

            const dataWithTimestamps = { ...data, created_at: moment.utc().toISOString() };
       
            const statement = pgp.helpers.insert(dataWithTimestamps, null, 'sold_items') + ' RETURNING *';
            const result = await db.query(statement);
       
            if (result.rows?.length) {
            return result.rows[0];
            }
            return null;
       
        } catch(err) {
           throw new Error(err);
        }
      }
}