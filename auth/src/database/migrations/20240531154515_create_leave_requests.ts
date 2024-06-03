import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('leave_requests', table => {
    table.bigIncrements('id').primary().unsigned();

    table
      .specificType('leave_type_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('leave_types');

    table.specificType('user_id', 'bigint(19)').unsigned().references('id').inTable('users');

    table.integer('fiscal_year_id').unsigned().references('id').inTable('fiscal_years');

    table.specificType('manager_id', 'bigint(19)').unsigned().references('id').inTable('users');

    table.timestamp('start_date').notNullable();

    table.timestamp('end_date').notNullable();

    table.enu('status', ['PEDNING', 'APPROVED', 'REJECTED', 'CANCELED']).notNullable();

    table.integer('leave_days').notNullable();

    table.string('reason').notNullable();

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
  await knex.schema.dropTable('leave_requests');
}
