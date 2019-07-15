const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');

const router = express.Router();

// Get all Movies
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');

  res.send(movies);
});

// Get One
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res
      .status(404)
      .send('The movie with the given title was not found.');

  res.send(movie);
});

// Post
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      genre: genre.genre
    }
  });

  await movie.save();
  res.send(movie);
});

// Put
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      genre: {
        _id: genre._id,
        genre: genre.genre
      }
    },
    { new: true }
  );

  if (!movie)
    return res
      .status(404)
      .send('The movie with the given title was not found.');

  res.send(movie);
});

// Delete One
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res
      .status(404)
      .send('The movie with the given title was not found.');

  res.send(movie);
});

module.exports = router;
