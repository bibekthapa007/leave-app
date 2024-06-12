import { Knex } from 'knex';

const TABLE_NAME = 'fiscal_years';

/**
 * Seed data for fiscal_years.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  await knex(TABLE_NAME).insert([
    {
      start_date: '2023-01-01',
      end_date: '2023-12-31',
      is_current: false,
      country_id: 1,
      created_by: 1,
    },
    {
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_current: true,
      country_id: 1,
      created_by: 1,
    },
    {
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      is_current: false,
      country_id: 1,
      created_by: 1,
    },
    {
      start_date: '2023-07-16',
      end_date: '2024-07-15',
      is_current: false,
      country_id: 2,
      created_by: 1,
    },
    {
      start_date: '2024-07-16',
      end_date: '2025-07-15',
      is_current: true,
      country_id: 2,
      created_by: 1,
    },
    {
      start_date: '2025-07-16',
      end_date: '2026-07-15',
      is_current: false,
      country_id: 2,
      created_by: 1,
    },
    {
      start_date: '2023-01-01',
      end_date: '2023-12-31',
      is_current: false,
      country_id: 3,
      created_by: 1,
    },
    {
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_current: true,
      country_id: 3,
      created_by: 1,
    },
    {
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      is_current: false,
      country_id: 3,
      created_by: 1,
    },
    {
      start_date: '2023-01-01',
      end_date: '2023-12-31',
      is_current: false,
      country_id: 4,
      created_by: 1,
    },
    {
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_current: true,
      country_id: 4,
      created_by: 1,
    },
    {
      start_date: '2025-01-01',
      end_date: '2025-12-31',
      is_current: false,
      country_id: 4,
      created_by: 1,
    },
  ]);
}
