import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert([
    { id: 1, name: 'Admin', created_by: 1 },
    { id: 2, name: 'User', created_by: 1 },
    { id: 3, name: 'Manager', created_by: 1 },
  ]);
}
