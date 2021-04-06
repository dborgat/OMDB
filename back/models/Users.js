const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../db");
const Movies = require("./Movies");

const bcrypt = require("bcrypt");

class User extends Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, 
    modelName: "User", 
  }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});


Movies.belongsTo(User , {as:"user"});

module.exports = User;