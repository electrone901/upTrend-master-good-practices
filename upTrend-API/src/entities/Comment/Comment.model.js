export default (db, DataTypes) => {
  const Comment = db.define('Comment', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    positiveVotes: { type: DataTypes.JSONB, field: 'positive_votes' },
    negativeVotes: { type: DataTypes.JSONB, field: 'negative_votes' }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  };

  return Comment;
};
