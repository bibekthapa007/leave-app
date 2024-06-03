import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.bigIncrements('id').primary().unsigned();

    table.string('name', 100).notNullable();

    table.string('email', 100).notNullable();

    table.string('department', 50).notNullable();

    table.string('phone', 20).notNullable();

    table.integer('country_id').unsigned().references('id').inTable('countries');

    table
      .specificType('designation_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('designations');

    table
      .specificType('manager_id', 'bigint(19)')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users');

    table.string('password', 100).notNullable();

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
      .unsigned()
      .references('id')
      .inTable('users')
      .unsigned()
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
