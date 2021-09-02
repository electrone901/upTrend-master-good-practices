import { or, and, rule, shield } from 'graphql-shield';
import Sequelize from 'sequelize';
const { Op } = Sequelize;

const isAuthenticated = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: { id: { [Op.eq]: req.session.userId } },
      raw: true
    }).then(user => !!user.id);
  }
});

const isAdmin = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.User.scope('withoutPassword').findOne({
      where: {
        id: { [Op.eq]: req.session.userId },
        role: { [Op.eq]: 'admin' }
      },
      raw: true
    }).then(({ role }) => role === 'admin');
  } else {
    return false;
  }
});

const isPostOwner = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.Post.findOne({
      where: {
        id: { [Op.eq]: (args.postId || args.input.postId) },
        userId: { [Op.eq]: req.session.userId }
      },
      raw: true
    }).then(post =>
      post.id === (args.postId || args.input.postId)
    );
  } else {
    return false;
  }
});

const isCommentOwner = rule()(async (parent, args, { models, req }, info) => {
  if (req.session && req.session.userId) {
    return models.Comment.findOne({
      where: {
        id: { [Op.eq]: (args.commentId || args.input.commentId) },
        userId: { [Op.eq]: req.session.userId }
      },
      raw: true
    }).then(comment =>
      comment.id === (args.commentId || args.input.commentId)
    );
  } else {
    return false;
  }
});

export const permissions = shield({
  Query: {
    getUser: isAuthenticated,
    getCurrentUser: isAuthenticated,
    allCommentsByPostId: isAuthenticated,
    allPosts: isAuthenticated,
    myLikedPosts: isAuthenticated,
    allUsers: isAuthenticated
  },
  Mutation: {
    createComment: isAuthenticated,
    updateComment: isCommentOwner,
    deleteComment: isCommentOwner,
    createPost: isAuthenticated,
    updatePost: isPostOwner,
    deletePost: isPostOwner,
    createUser: isAdmin,
    updateUser: isAdmin,
    deleteUser: isAdmin
  }
});
