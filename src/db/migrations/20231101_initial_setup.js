/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    // Create role and permission tables first as they are referenced by others
    .createTable('role', table => {
      table.increments('role_id').primary();
      table.string('name').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Add index on name for faster lookups
      table.index('name');
    })
    .createTable('permission', table => {
      table.increments('permission_id').primary();
      table.string('name').notNullable().unique();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Add index on name for faster lookups
      table.index('name');
    })
    .createTable('role_permission', table => {
      table.increments('role_permission_id').primary();
      table.integer('role_id').unsigned().notNullable();
      table.integer('permission_id').unsigned().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Add foreign key references
      table.foreign('role_id')
        .references('role_id')
        .inTable('role')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.foreign('permission_id')
        .references('permission_id')
        .inTable('permission')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      // Add composite unique constraint
      table.unique(['role_id', 'permission_id']);

      // Add indexes for foreign keys
      table.index('role_id');
      table.index('permission_id');
    })
    // Create team_details before user_registration as it's referenced by user_registration
    .createTable('team_details', table => {
      table.increments('team_id').primary();
      table.string('team_name').notNullable();
      table.string('email');
      table.string('mobile_no', 10);
      table.boolean('isLead');
      table.string('first_name').notNullable();
      table.string('middle_name');
      table.string('last_name').notNullable();
      table.string('position').notNullable().defaultTo('captain');
   
      table.string('gender');
      table.date('dob');
      table.string('t_shirt_size');
      table.string('track_pant_size');
      table.string('passport_picture').nullable();
      table.string('age_proof').nullable();

      table.uuid('uuid').defaultTo(knex.raw('(UUID())'));
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      
      // Add indexes
      table.index('team_name');
    }).

    createTable('user_registration', table => {
      table.increments('user_id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('team_name').notNullable().unique();
      table.string('team_zone').notNullable();
      table.integer('team_id').unsigned().notNullable();
      table.string('mobile_no', 10).notNullable().unique();
      table.string('otp', 6).notNullable();
      table.specificType('team_status', "ENUM('Pending', 'Approve', 'Reject')")
        .defaultTo('Pending')
        .notNullable(); // Update this column to ENUM
      table.boolean('is_active').defaultTo(true);
      table.uuid('uuid').defaultTo(knex.raw('(UUID())'));
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Add named check constraint
      table.check('?? != ??', ['first_name', 'last_name'], 'check_different_names');

      // Add foreign key reference to team_details
      table.foreign('team_id')
        .references('team_id')
        .inTable('team_details')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      // Add index on foreign key
      table.index('team_id');
    })
    // Create user_role last as it references both role and user_registration
    .createTable('user_role', table => {
      table.increments('user_role_id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('role_id').unsigned().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Add foreign key references
      table.foreign('user_id')
        .references('user_id')
        .inTable('user_registration')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.foreign('role_id')
        .references('role_id')
        .inTable('role')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      // Add composite unique constraint
      table.unique(['user_id', 'role_id']);

      // Add indexes for foreign keys
      table.index('user_id');
      table.index('role_id');
    }).
    createTable('admin', (table) => {
      table.increments('admin_id').primary(); // Auto-incrementing primary key
      table.string('mobile_no', 10).notNullable().unique(); // Admin's mobile number
      table.string('otp', 6).notNullable(); // OTP for authentication
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for creation
      table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for last update
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    // Drop tables in reverse order to handle foreign key constraints
    .dropTableIfExists('user_role')
    .dropTableIfExists('user_registration')
    .dropTableIfExists('team_details')
    .dropTableIfExists('role_permission')
    .dropTableIfExists('permission')
    .dropTableIfExists('role')
    .dropTableIfExists('admin');
};

//comment added 