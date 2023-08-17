const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [{
    type: String,
    enum: ['admin', 'standard'],
    default: 'standard'
  }],
  registrationDate: {
    type: Date,
    default: Date.now
  }
});


userSchema.pre('save', async function(next) {
    try {
        // Only hash the password if it's new or modified
        if (!this.isModified('password')) {
          return next();
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
      } catch (error) {
        throw error;
      }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
