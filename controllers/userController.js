const { User, Thought } = require("../models");

module.exports = {
  // Get for all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get for a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'There is no user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'There is no user with that id!' });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},
  // Delete user along with any thoughts they had
  async deleteUser(req, res) {
      try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });

          if (!user) {
              res.status(404).json({ message: 'There is no user with that ID' });
          }

          await Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User and their thoughts have been deleted!' });
      } catch (err) {
          res.status(500).json(err);
      }
  },
  // Add a friend
  async addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);

      try {
          const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $addToSet: { friends: req.params.friendId } },
              { runValidators: true, new: true }
          );

          if (!user) {
              return res
                  .status(404)
                  .json({ message: 'There is no user with that ID' });
          }

          res.json(user);
      } catch (err) {
          console.log(err);
          res.status(500).json(err);
      }
  },
  // Remove a friend
  async removeFriend(req, res) {
      try {
          const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { runValidators: true, new: true }
          );

          if (!user) {
              return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }

          res.json(user);
        } catch (err) {
          res.status(500).json(err);
      }
  },
};