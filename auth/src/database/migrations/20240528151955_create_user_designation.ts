import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('designations', table => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name', 50).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('created_by').unsigned();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('updated_by').unsigned();
    table.timestamp('deleted_at').nullable();
    table.integer('deleted_by').unsigned().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('designations');
}
