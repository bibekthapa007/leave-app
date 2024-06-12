import { Knex } from 'knex';

const TABLE_NAME = 'fiscal_years';

export function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();

    table.date('start_date').notNullable();

    table.date('end_date').notNullable();

    table.boolean('is_current').defaultTo(false);

    table.integer('country_id').unsigned().references('id').inTable('countries');

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('updated_at');

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('deleted_at').nullable();

    table
      .specificType('deleted_by', 'bigint(19)')
      .references('id')
      .inTable('users')
      .unsigned()
      .nullable();

    table.unique(['country_id', 'start_date', 'end_date']);
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
