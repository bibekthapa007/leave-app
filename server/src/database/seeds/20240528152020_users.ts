import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Seed data for users.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert([
    {
      id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      department: 'Operation',
      phone: '123456',
      country_id: 1,
      designation_id: 1,
      password: 'd8ec9b20f8519604e1b6d4bdfcd43db2730a9408c6ae2cd6f8cef70f1b10250a',
      created_at: knex.fn.now(),
      created_by: 1,
    },
    {
      id: 2,
      name: 'Manager',
      email: 'manager@gmail.com',
      department: 'Operation',
      phone: '123456',
      country_id: 1,
      designation_id: 1,
      password: 'd8ec9b20f8519604e1b6d4bdfcd43db2730a9408c6ae2cd6f8cef70f1b10250a',
      created_at: knex.fn.now(),
      created_by: 1,
    },
    {
      id: 3,
      name: 'User',
      email: 'user@gmail.com',
      department: 'Operation',
      phone: '123456',
      country_id: 1,
      manager_id: 2,
      designation_id: 1,
      password: 'd8ec9b20f8519604e1b6d4bdfcd43db2730a9408c6ae2cd6f8cef70f1b10250a',
      created_at: knex.fn.now(),
      created_by: 1,
    },
  ]);
}
