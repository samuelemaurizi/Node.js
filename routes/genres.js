const validateObjectId = require('../middleware/validataObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

// GET All Genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('genre');
  // console.log(genres);
  res.send(genres);
});

// GET specific genre
router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given name was not found.');

  res.send(genre);
});

// POST genre
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    genre: req.body.genre
  });

  await genre.save();
  res.send(genre);
});

// PUT modify specific genre
router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { genre: req.body.genre },
    { new: true }
  );

  if (!genre)
    return res.status(404).send('The genre with the given name was not found.');

  res.send(genre);
});

// DELETE one
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send('The genre with the given name was not found.');

  res.send(genre);
});

module.exports = router;
