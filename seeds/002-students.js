
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
       { name: "Luke", cohort_id: 5 },
       { name: "Han", cohort_id: 3 },
       { name: "Yoda", cohort_id: 1 }
      ]);
    });
};
