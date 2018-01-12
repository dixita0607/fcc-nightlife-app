const {Visit} = require('../models/visit');

const sweeper = (req, res, next) => {
  Visit.find({timestamp: {$lt: Date.now() - 43200000}}).remove().exec()
    .then(() => next())
    .catch(error => res.status(500).end());
};

module.exports = sweeper;
