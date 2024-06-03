import { Knex } from 'knex';

const TABLE_NAME = 'user_roles';

/**
 * Seed data for user_roles.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert([
    {
      id: 1,
      user_id: 1,
      role_id: 1,
      created_by: 1,
    },
    {
      id: 2,
      user_id: 2,
      role_id: 2,
      created_by: 1,
    },
    {
      id: 3,
      user_id: 2,
      role_id: 3,
      created_by: 1,
    },
    {
      id: 4,
      user_id: 3,
      role_id: 2,
      created_by: 1,
    },
  ]);
}
