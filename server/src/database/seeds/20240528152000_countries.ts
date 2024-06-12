import { Knex } from 'knex';

const TABLE_NAME = 'countries';

/**
 * Seed data for countries.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert([
    {
      id: 1,
      name: 'USA',
      created_by: 1,
      updated_by: 1,
    },
    {
      id: 2,
      name: 'Canada',
      created_by: 1,
      updated_by: 1,
    },
    {
      id: 3,
      name: 'Nepal',
      created_by: 1,
      updated_by: 1,
    },
    {
      id: 4,
      name: 'India',
      created_by: 1,
      updated_by: 1,
    },
  ]);
}
