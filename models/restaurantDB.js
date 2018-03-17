const restaurantDB = require('../config/connection');

module.exports = {
  save(restaurant) {
    return restaurantDB.one(`INSERT INTO restaurants(name, rating, cuisine, img_src, loc)
                                        VALUES($[name], $[rating], $[cuisine],
                                        $[img_src], $[loc]) RETURNING *`, restaurant);
  },

  getUsers(restaurant) {
    return restaurantDB.any(`SELECT *
                                            FROM restaurants
                                            WHERE name = $1`, restaurant);
  },

  update(restaurant) {
    return restaurantDB.one(`UPDATE restaurants SET name = $[name],
                                          rating = $[rating], cuisine = $[cuisine]
                                        WHERE id=$[id] RETURNING *`, restaurant);
  },

  deleteRestaurantByName(restaurant) {
    return restaurantDB.none(`DELETE FROM restaurants WHERE name = $1`, restaurant);
  },

  findUser(restaurant) {
    return restaurantDB.one(`SELECT *
                                        FROM restaurants
                                        WHERE name = $[name]`, restaurant);
  },

};
