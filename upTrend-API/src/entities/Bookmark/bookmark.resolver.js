import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    myBookmarks: (parent, args, { models, req }) =>
      models.Bookmarks.findAll({
        where: { userId: { [Op.eq]: req.session.userId } },
        raw: true
      })
  },
  Mutation: {
    deleteBookmark: async (parent, { bookmarkId }, { models }) => {
      try {
        await models.Bookmark.destroy({ where: { id: bookmarkId } });
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    createBookmark: async (parent, { input }, { models }) => {
      try {
        await models.Bookmark.create(input);
        return {
          ok: true
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
