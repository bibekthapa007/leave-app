import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_roles', table => {
    table.bigIncrements('id').primary().unsigned();
    table.primary(['user_id', 'role_id']);
    table.specificType('user_id', 'bigint(19)').unsigned().references('id').inTable('users');
    table.specificType('role_id', 'bigint(19)').unsigned().references('id').inTable('roles');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('created_by').unsigned();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('updated_by').unsigned();
    table.timestamp('deleted_at').nullable();
    table.integer('deleted_by').unsigned().nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_roles');
}
