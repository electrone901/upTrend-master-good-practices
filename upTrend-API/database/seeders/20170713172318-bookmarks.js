'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
      INSERT INTO
        bookmarks(user_id, post_id, created_at, updated_at)
      VALUES
        (1, 1, '2019-01-08', '2019-01-08'),
        (2, 2, '2019-01-08', '2019-01-08'),
        (3, 3, '2019-01-08', '2019-01-08'),
        (4, 4, '2019-01-08', '2019-01-08'),
        (5, 5, '2019-01-08', '2019-01-08')
    `);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
