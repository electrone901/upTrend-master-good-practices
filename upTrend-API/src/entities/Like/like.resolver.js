import { formatErrors } from '../../utils/format-errors';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

export default {
  Query: {
    myLikedPosts: async (parent, args, { models, req }) => {
      console.log(req.session.userId);
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
      WHERE l.user_id = :current
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `, { replacements: { current: req.session.userId }, type: models.db.QueryTypes.SELECT });
      return allPosts;
    }
  },
  Mutation: {
    toggleLikeOnPost: async (parent, { postId }, { models, req }) => {
      try {
        const userId = req.session.userId;
        const likedPost = await models.Like.findOne({
          where: { postId, userId }
        });
        if (likedPost) {
          await likedPost.destroy();
          return {
            ok: true,
            isLiked: false
          };
        } else {
          await models.Like.create({ postId, userId });
          return {
            ok: true,
            isLiked: true
          };
        }
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    }
  }
};
