export default (db, DataTypes) => {
  const Bookmark = db.define('Bookmark', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postId: {
      field: 'post_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: db.models.Post,
        key: 'id'
      }
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: db.models.User,
        key: 'id'
      }
    }
  });

  return Bookmark;
};
