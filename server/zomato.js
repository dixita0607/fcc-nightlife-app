const request = require('request');

const getCitySuggestion = (cityName) => new Promise((resolve, reject) => {
  request.get('https://developers.zomato.com/api/v2.1/cities', {
    headers: {'user-key': process.env.ZOMATO_API_KEY},
    json: true,
    qs: {q: cityName}
  }, (error, response, body) => {
    if (error) return reject(500);
    if (body.location_suggestions.length === 0) return reject(404);
    const [{id: cityId, name: city}] = body.location_suggestions;
    resolve({cityId, city});
  });
});

const getRestaurantSuggestions = (cityId) => new Promise((resolve, reject) => {
  request.get('https://developers.zomato.com/api/v2.1/search', {
    headers: {'user-key': process.env.ZOMATO_API_KEY},
    json: true,
    qs: {
      entity_id: cityId,
      entity_type: 'city',
      sort: 'rating',
      order: 'desc'
    }
  }, (error, response, body) => {
    if (error) return reject(500);
    if (body.restaurants.length === 0) return reject(404);
    const restaurants = body.restaurants.map(restaurant => restaurant.restaurant);
    restaurants.forEach(restaurant => {
      delete restaurant.apikey;
    });
    resolve(restaurants);
  });
});

module.exports = {
  getCitySuggestion,
  getRestaurantSuggestions: getRestaurantSuggestions
};
