/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Delete existing entries in the tables to prevent duplicates
    await knex('role_permission').del();
    await knex('permission').del();
    await knex('role').del();
  
    // Insert static data into the role table
    await knex('role').insert([
      { role_id: 1, name: 'player' },
      { role_id: 2, name: 'admin' }
    ]);
  
    // Insert static data into the permission table
    await knex('permission').insert([
      { permission_id: 1, name: 'view_team' },
      { permission_id: 2, name: 'approve_team/reject_team' },
      { permission_id: 3, name: 'add_team_player/remove_team_player' }
    ]);
  
    // Insert static data into the role_permission table
    await knex('role_permission').insert([
      { role_permission_id: 1, role_id: 1, permission_id: 1 },
      { role_permission_id: 2, role_id: 2, permission_id: 1 },
      { role_permission_id: 3, role_id: 2, permission_id: 2 },
      { role_permission_id: 4, role_id: 1, permission_id: 3 }
    ]);
  };
  