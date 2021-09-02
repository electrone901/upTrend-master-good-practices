import Sequelize from 'sequelize';
import { db } from './db';

const models = {
  User: db.import('../entities/User/User.model.js'),
  Post: db.import('../entities/Post/Post.model.js'),
  Comment: db.import('../entities/Comment/Comment.model.js'),
  Bookmark: db.import('../entities/Bookmark/Bookmark.model.js'),
  Like: db.import('../entities/Like/Like.model.js')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default {
  ...models,
  db,
  Sequelize
};
