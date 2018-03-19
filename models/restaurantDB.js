const restaurantDB = require('../config/connection');

module.exports = {
  save(restaurant) {
    return restaurantDB.one(`INSERT INTO restaurants(name, rating, cuisine, img_src, loc)
                                              VALUES($[name], $[rating],
                                              $[cuisine], $[img_src], $[loc])
                                              RETURNING *`, restaurant);
  },

  getAllRestaurants() {
    return restaurantDB.any(`SELECT * FROM restaurants`);
  },

  getOneRestaurant(restaurant) {
    return restaurantDB.any(`SELECT *
                                              FROM restaurants
                                              WHERE name = $1`, restaurant);
  },

  updateRestaurant(restaurant) {
    return restaurantDB.one(`UPDATE restaurants SET name = $[newName],
                                                rating = $[rating], cuisine = $[cuisine]
                                                WHERE name=$[name] RETURNING *`, restaurant);
  },

  destroyRestaurantByName(restaurant) {
    return restaurantDB.none(`DELETE FROM restaurants WHERE name = $1`, restaurant);
  },
};
