import { Knex } from 'knex';

const TABLE_NAME = 'countries';

/**
 * Create table countries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();

    table.string('name').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.specificType('created_by', 'bigint(19)').unsigned().nullable();

    table.timestamp('updated_at');

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()

      .nullable();

    table.timestamp('deleted_at').nullable();

    table.specificType('deleted_by', 'bigint(19)').unsigned().nullable();
  });
}

/**
 * Drop table countries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
