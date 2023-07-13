const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcrypt');

const userCollection = 'usuarios';

const UserSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    full_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'carts',
    },
});
UserSchema.pre('save', async function (next) {
    const user = this;
  
    if (!user.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
  
      const hash = await bcrypt.hash(user.password, salt);
  
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  });
UserSchema.plugin(mongoosePaginate);

const UserModel = model(userCollection, UserSchema);

module.exports = {
    UserModel
};

