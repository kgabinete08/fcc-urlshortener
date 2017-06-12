const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  normalUrl: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  shortenedUrl: {
    type: String,
    unique: true,
    required: true
  }
});


module.exports = mongoose.model('Url', urlSchema);
