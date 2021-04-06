const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../db");
class Movies extends Model {}


Movies.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    movieId:{
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize, 
    modelName: "Movie", 
  }
);



module.exports = Movies;