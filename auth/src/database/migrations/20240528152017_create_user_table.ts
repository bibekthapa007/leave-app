import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('department', 50).notNullable();
    table.string('phone', 20).notNullable();
    table.string('country', 50).notNullable();
    table
      .specificType('designation_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('designations');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('created_by').unsigned();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('updated_by').unsigned();
    table.timestamp('deleted_at').nullable();
    table.integer('deleted_by').unsigned().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
