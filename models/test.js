let mongoose = require('mongoose');

let TestSchema = new mongoose.Schema({
  test: {type: String, required: true}
});

module.exports = mongoose.model('Test', TestSchema);