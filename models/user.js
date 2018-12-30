const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    permission: Number,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
//TODO should not save password with clear text
userSchema.methods.validPassword = function(password) {
  return password===this.password;
};
let User = mongoose.model('User', userSchema);
module.exports = User;