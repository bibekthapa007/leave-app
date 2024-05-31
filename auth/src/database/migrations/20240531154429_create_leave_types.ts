import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('leave_types', table => {
    table.bigIncrements('id').primary().unsigned();

    table.string('name', 100).notNullable();

    table.integer('default_days').notNullable();

    table.integer('max_days').notNullable();

    table.boolean('is_transferable').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();

    table.timestamp('updated_at');

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('leave_types');
}
