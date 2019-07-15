const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Schema = mongoose.Schema;

// Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  }
});

// Model
const Customer = mongoose.model('Customer', customerSchema);

// Validate
function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(3)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };
  return Joi.validate(customer, schema);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
