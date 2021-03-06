
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
      
        tbl.increments();

        tbl.integer('cohort_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl
            .string('name', 128)
            .notNullable()
            .unique();
        tbl.timestamps(true, true);
    
    
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
