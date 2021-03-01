
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_username: 'finn', user_password:"password", user_email:"adventure@time.com"},
        { user_username: 'bmo', user_password:"password", user_email:"adventure@time.com"},
        { user_username: 'jake the dog', user_password:"password", user_email:"adventure@time.com"}
      ]);
    });
};
