const express = require('express');
const { Adminmodel } = require('../models/admin.model');

const admin = express.Router();

// Read the data using get request
admin.get("/", async (req, res) => {
  try {
    let admin = await Adminmodel.find()
    // console.log(data)
    res.status(200).send(admin)
  } catch (err) {
    return res.status(404).send(err.message);
  }
})

module.exports = { admin }