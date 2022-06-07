const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { User, Flight, Result } = require('../models');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        
        return user;
      }

      throw new AuthenticationError('Not logged in');
      },
      flights: async () => {
        return Flight.find({})
      },
      flight: async (parent, { _id }) => {
        return Flight.findOne({ _id})
      },
      results: async () => {
        return Result.find({})
      },
      result: async (parent, { _id }) => {
        return Result.findOne({ _id})
      },
      resultByUser: async (parent, { username }) => {
        return Result.find({ username })
      },
    },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createFlight: async (parent, args) => {
      const flight = await Flight.create(args);
      return flight;
    },
    deleteFlight: async (parent,  { id } ) => {
      return Flight.findByIdAndDelete({_id: id })
    }, 
    createResult: async (parent, args) => {
      const result = await Result.create(args);
      return result;
    },
    deleteResult: async (parent,  { id } ) => {
      return Result.findByIdAndDelete({_id: id })
    }, 
  }
};

module.exports = resolvers;
