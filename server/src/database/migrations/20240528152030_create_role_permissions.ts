import { Knex } from 'knex';

const TABLE_NAME = 'roles_permissions';

/**
 * Create table roles_permissions.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex: Knex) {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.bigIncrements('id').primary().unsigned();

    table.integer('role_id').unsigned().notNullable().references('id').inTable('roles');

    table.integer('permission_id').unsigned().notNullable().references('id').inTable('permissions');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('updated_at');

    table
      .specificType('deleted_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();

    table.timestamp('deleted_at');

    table.unique(['role_id', 'permission_id']);
  });
}

/**
 * Drop table roles_permissions.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex: Knex) {
  return knex.schema.dropTable(TABLE_NAME);
}
