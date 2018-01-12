const express = require('express');
const router = express.Router();
const zomato = require('../zomato');
const passport = require('passport');
const authenticate = require('../middlewares/authenticate');
const {Visit} = require('../models/visit');

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/search', (req, res) => {
  zomato.getCitySuggestion(req.query.city)
    .then(({cityId, city}) => {
      zomato.getRestaurantSuggestions(cityId)
        .then(restaurants => {
          const restaurantIds = restaurants.map(restaurant => restaurant.id);
          const stats = {};
          restaurantIds.forEach(restaurantId => {
            stats[restaurantId] = {count: 0, visiting: false};
          });
          Visit.find({restaurantId: restaurantIds})
            .then(visits => {
              if (visits) {
                visits.forEach(visit => {
                  stats[visit.restaurantId].count++;
                  if (req.user && req.user.username === visit.username) {
                    stats[visit.restaurantId].visiting = true;
                  }
                });
              }
              restaurants.forEach(restaurant => {
                restaurant.stats = stats[restaurant.id];
              });
              res.status(200).json({restaurants, city});
            })
            .catch(error => res.status(500).end());
        })
        .catch(statusCode => res.status(statusCode).end());
    })
    .catch(statusCode => res.status(statusCode).end())
});

router.post('/visit', authenticate, (req, res) => {
  if (req.body && req.body.restaurantId && typeof req.body.visiting === 'boolean') {
    Visit.findOne({username: req.user.username, restaurantId: req.body.restaurantId})
      .then(visit => {
        if (visit) {
          if (!req.body.visiting) {
            visit.remove()
              .then(() => res.status(200).end())
              .catch(error => res.status(500).end());
          } else res.status(200).end();
        } else {
          if (req.body.visiting) {
            Visit.create({
              username: req.user.username,
              restaurantId: req.body.restaurantId,
              timestamp: Date.now()
            })
              .then(() => res.status(200).end())
              .catch(error => res.status(500).end());
          } else res.status(200).end();
        }
      })
      .catch(error => res.status(500).end());
  } else res.status(400).end();
});

router.get('/user', (req, res) => {
  if (req.user) res.status(200).json(req.user);
  else res.status(404).end();
});

module.exports = router;
