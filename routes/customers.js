const { Customer, validate } = require('../models/customer');
const express = require('express');

const router = express.Router();

// Get all Customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');

  res.send(customers);
});

// Get one
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send('The Customer with the given name was not found.');

  res.send(customer);
});

// Post Customer
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });

  await customer.save();
  res.send(customer);
});

// Put/Modify Customer
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    },
    { new: true }
  );

  if (!customer)
    return res
      .status(404)
      .send('The Customer with the given name was not found.');

  res.send(customer);
});

// Delete one
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send('The Customer with the given name was not found.');

  res.send(customer);
});

module.exports = router;
