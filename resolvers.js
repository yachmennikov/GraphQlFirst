const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers = {

  Query: {

    getAllRecipes: async (root, args, { Recipe }) => {
      return await Recipe.find()
    },

    getRecipe: async (root, { _id }, { Recipe }) => {
     return await Recipe.findOne({ _id }) 
    },

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        return await Recipe.find({
          $text: { $search: searchTerm }
        }, {
          scope: { $meta: 'textScore' }
        }).sort({ scope: { $meta: 'textScore' } })
      } else {
        return await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' })
      }
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) return null;
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Recipe'
        });
      return user
    },

    getUserRecipes: async (root, { username }, { Recipe }) => {
      return await Recipe.find({ username }).sort({ createdDate: 'desc' })
    }
      
  },

  Mutation: {

    addRecipe: async (root, {
      name, category, description, instructions, createdDate, likes, username
    }, { Recipe }) => {
      return await new Recipe({
        name, category, description, instructions, createdDate, likes, username
      }).save()
    },

    signupUser: async (root, { username, email, password }, { User }) => {

      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists')
      }

      const newUser = await new User({ username, email, password }).save();
      return { token: createToken(newUser, process.env.SECRET, '10hr') }
    },

    signinUser: async (root, { username, password }, { User }) => {

      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found')
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password')
      }
      return { token: createToken(user, process.env.SECRET, '10hr') }
    }

  }
}