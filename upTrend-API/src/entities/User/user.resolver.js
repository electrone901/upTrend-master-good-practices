import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { API_CONFIG } from 'config';
import Sequelize from 'sequelize';
import { formatErrors } from '../../utils/format-errors';
const { Op } = Sequelize;

export default {
  Query: {
    getCurrentUser: async (_parent, _args, { models, req }) => {
      try {
        const user = await models.User.scope('withoutPassword').findOne(
          {
            where: {
              id: {
                [Op.eq]: req.session.userId
              }
            },
            raw: true
          }
        );
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    getUser: async (_parent, { userId }, { models, req }) => {
      try {
        const user = await models.User.scope('withoutPassword').findOne(
          {
            where: {
              id: {
                [Op.eq]: userId
              }
            },
            raw: true
          }
        );
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    allUsers: (parent, args, { models }) => models.User.findAll({
      raw: true,
      order: [
        ['firstName', 'ASC']
      ]
    })
  },
  Mutation: {
    register: async (_parent, { input }, { models }) => {
      try {
        const user = await models.User.create(input).then(userRes => {
          const { password, ...userInfos } = userRes.get({ plain: true });
          return userInfos;
        });
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    createUser: async (_parent, { input }, { models }) => {
      try {
        const password = v4().substring(0, 20);
        const user = await models.User.create({ ...input, password }).then(userRes => {
          const { password, ...userInfos } = userRes.get({ plain: true });
          return userInfos;
        });
        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    updateUser: async (parent, { input }, { models }) => {
      try {
        const { userId, ...newData } = input;
        await models.User.update(
          { ...newData },
          { where: { id: { [Op.eq]: userId } } }
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
    login: async (_parent, { email, password }, { models, req }) => {
      try {
        const user = await models.User.findOne({
          where: { email: { [Op.eq]: email } },
          raw: true
        });

        if (!user) {
          return {
            ok: false,
            errors: [
              {
                path: '/authorization',
                message: 'Wrong credentials'
              }
            ]
          };
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return {
            ok: false,
            errors: [
              {
                path: '/authorization',
                message: 'Wrong credentials'
              }
            ]
          };
        }

        req.session.userId = user.id;

        return {
          ok: true,
          user
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models)
        };
      }
    },
    logout: async (_parent, _args, { req, res }) => {
      return new Promise((resolve, reject) =>
        req.session.destroy(err => {
          if (err) {
            console.log(err);
            reject({ ok: false });
          }
          res.clearCookie(API_CONFIG.sessionOptions.name);
          return resolve({ ok: true });
        })
      );
    },
    deleteUser: async (parent, { id }, { models }) => {
      try {
        await models.User.destroy(
          { where: { id } }
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
    }
  }
};
