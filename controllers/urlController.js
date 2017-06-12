const mongoose = require('mongoose');
const validator = require('validator');
const Url = mongoose.model('Url');

exports.homePage = (req, res, next) => {
  res.render('index', {title: 'URL Shortener'});
};

exports.createUrl = async (req, res) => {
  const input = req.params.url;
  if (!validator.isURL(input)) {
    res.json({ Error: 'Not a valid URL' });
    return;
  }

  let url;
  // check if input url already exists in db
  const urlInDb = await Url.findOne({ normalUrl: input });
  if (!urlInDb) {
    // if not found, create new record
    const urlIndex = Date.now();
    url = await new Url({ normalUrl: input, shortenedUrl: urlIndex }).save();
  } else {
    // if found, return url
    url = urlInDb;
  }
  const shortUrl = `https://kg-fcc-urlshortener.herokuapp.com/${url.shortenedUrl}`;
  const results = {
    normal_url: url.normalUrl,
    short_url: shortUrl
  }
  res.json(results);
};

exports.goToUrl = async (req, res) => {
  const url = await Url.findOne({ shortenedUrl: req.params.url });
  if (!url) {
    res.json({ Error: 'Not a valid URL' });
    return;
  }
  res.redirect(`http://${url.normalUrl}`);
};
