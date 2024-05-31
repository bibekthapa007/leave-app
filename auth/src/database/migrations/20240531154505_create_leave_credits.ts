import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('leave_credits', table => {
    table.bigIncrements('id').primary().unsigned();

    table
      .specificType('leave_type_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('leave_types');

    table.specificType('user_id', 'bigint(19)').unsigned().references('id').inTable('users');

    table.integer('default_days').notNullable();

    table.integer('max_days').notNullable();

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
  await knex.schema.dropTable('leave_credits');
}
