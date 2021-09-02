'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    INSERT INTO comments(title, content, user_id, post_id,
      positive_votes, negative_votes, created_at, updated_at) VALUES
    ('upTrend is cool', 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 2, 3, '[1, 2]', '[3, 5]', '2019-01-08', '2019-01-08'),
    ('upTrend is nice','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 3, 2, '[3, 5]', '[1, 2]', '2019-01-08', '2019-01-08'),
    ('upTrend so useful','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 1, 1, '[2, 4]', '[3, 5]', '2019-01-08', '2019-01-08'),
    ('I love upTrend !','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 5, 6, '[1, 2]', '[2, 4]', '2019-01-08', '2019-01-08'),
    ('upTrend is baaad','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 6, 4, '[3, 4]', '[1, 2]', '2019-01-08', '2019-01-08')`);
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
