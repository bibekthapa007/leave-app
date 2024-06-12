import { Knex } from 'knex';

const TABLE_NAME = 'leave_credits';

/**
 * Seed data for leave_credits.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert([
    {
      user_id: 1,
      leave_type_id: 1,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
    {
      user_id: 1,
      leave_type_id: 2,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
    {
      user_id: 2,
      leave_type_id: 1,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
    {
      user_id: 2,
      leave_type_id: 2,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
    {
      user_id: 3,
      leave_type_id: 1,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
    {
      user_id: 3,
      leave_type_id: 2,
      leave_days: 20,
      taken_days: 10,
      fiscal_year_id: 2,
      reason: 'Seed Data',
      created_by: 1,
    },
  ]);
}
