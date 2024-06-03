import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('leave_types').del();

  // Inserts seed entries
  await knex('leave_types').insert([
    { name: 'Annual', default_days: 20, max_days: 15, is_transferable: true, created_by: 1 },
    { name: 'Sick', default_days: 10, max_days: 10, is_transferable: false, created_by: 1 },
    // Add more leave types as needed
  ]);
}
