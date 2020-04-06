const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = mongoose.Schema;

// Schema
const genreSchema = new Schema({
  genre: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// Model
const Genre = mongoose.model('Genre', genreSchema);

// Validation
function validateGenre(genre) {
  const schema = {
    genre: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
