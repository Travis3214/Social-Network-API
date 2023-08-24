// Requires mongoose to build the models
const { Schema, model, Types } = require('mongoose');

// Builds a model for the users
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address'],
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: "Thought",
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  // This retrieves the length of the user's friends array field on query
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

  const User = model('User', userSchema);
  module.exports = User;