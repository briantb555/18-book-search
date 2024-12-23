import User from '../models/User.js';
import { signToken } from '../services/auth.js';

interface userPayload {
    _id: unknown;
    username: string;
    email: string,
  }

const resolvers = {
    Query: {
        me: async (_: any, __: any, context: { user?: userPayload }) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            throw new Error ('You need to be logged in!');
        }
    },

    Mutation: {
        login: async (_: any, { email, password }: { email: string, password: string }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Incorrect credentials');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        addUser: async (_: any, { username, email, password }: { username: string, email: string, password: string }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        saveBook: async (_: any, { authors, description, title, bookId, image, link }: { authors: string[], description: string, title: string, bookId: string, image: string, link: string }, context: { user?: userPayload }) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { authors, description, title, bookId, image, link } } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new Error('You need to be logged in!');
        },

        removeBook: async (_: any, { bookId }: { bookId: string }, context: { user?: userPayload }) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error('You need to be logged in!');
        }
    },
};

export default resolvers;