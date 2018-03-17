const restaurantDB = require('../config/connection');

module.exports = {
  save(restaurant) {
    return restaurantDB.one(`INSERT INTO restaurants(name, rating, cuisine, img_src, loc)
                                              VALUES($[restaurant.name], $[restaurant.rating],
                                              $[restaurant.cuisine], $[restaurant.img_src], $[restaurant.loc])
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
    return restaurantDB.one(`UPDATE restaurants SET name = $[restaurant.name],
                                                rating = $[restaurant.rating], cuisine = $[restaurant.cuisine]
                                                WHERE id=$[restaurant.id] RETURNING *`, restaurant);
  },

  destroyRestaurantById(restaurant) {
    return restaurantDB.none(`DELETE FROM restaurants WHERE name = $1`, restaurant);
  },
};
