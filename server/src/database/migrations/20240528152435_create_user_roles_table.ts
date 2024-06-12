import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_roles', table => {
    table.bigIncrements('id').primary().unsigned();
    table.specificType('user_id', 'bigint(19)').unsigned().references('id').inTable('users');
    table.specificType('role_id', 'bigint(19)').unsigned().references('id').inTable('roles');

    table.unique(['user_id', 'role_id']);

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
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_roles');
}
