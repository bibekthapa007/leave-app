import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', table => {
    table.bigIncrements('id').primary().unsigned();

    table
      .specificType('user_id', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();

    table.string('type').notNullable(); // Type of notification (e.g., 'leave_request', 'system', etc.)

    table.text('message').notNullable(); // Notification message

    table.json('data').nullable(); // Optional additional data

    table.boolean('is_read').defaultTo(false).notNullable(); // Read status of the notification

    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

    table.timestamp('updated_at').nullable();

    table
      .specificType('created_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable();

    table
      .specificType('updated_by', 'bigint(19)')
      .unsigned()
      .references('id')
      .inTable('users')
      .nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('notifications');
}
