import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    allPosts: async (parent, args, { models }) => {
      const allPosts = await models.db.query(`
        SELECT 
          p.id, p.title, p.category, p."content", p.cover, p.user_id as "userId",
          p.created_at as "createdAt", p.updated_at as "updatedAt",
          COALESCE(json_agg(distinct l.user_id)
            FILTER(WHERE l.user_id IS NOT NULL), '[]') as likes,
          COUNT(distinct c.user_id) as "commentsCount"
        FROM posts as p
        LEFT JOIN "comments" as c
          ON p.id = c.post_id
        LEFT JOIN likes as l
          ON p.id = l.post_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `, { type: models.db.QueryTypes.SELECT });
      return allPosts;
    }
  },
  Mutation: {
    updatePost: async (parent, { input }, { models }) => {
      try {
        const { postId, ...newData } = input;
        await models.Post.update(
          { ...newData },
          { where: { id: { [Op.eq]: postId } } }
        );
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
    deletePost: async (parent, { postId }, { models }) => {
      try {
        await models.Post.destroy(
          { where: { id: { [Op.eq]: postId } } }
        );
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
    createPost: async (parent, { input }, { models, req }) => {
      try {
        await models.Post.create({ userId: req.session.userId, ...input });
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
