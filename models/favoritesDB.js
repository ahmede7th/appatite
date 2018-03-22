const favoriteDB = require('../config/connection');

module.exports = {
  addFavorite(favorite) {
    return favoriteDB.one(`INSERT INTO favorites(user_id, restaurant_name)
                                          VALUES($[user_id], $[restaurant_name])
                                          RETURNING *`, favorite);
  },

  removeFavorite(favorite) {
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE user_id = $[user_id]
                                            AND restaurant_name = $[restaurant_name]`, favorite);
  },

  getRestaurantCountFavorites(name) {
    return favoriteDB.any(`SELECT COUNT(user_id)
                                          FROM favorites
                                          WHERE restaurant_name = $1
                                          `, name);
  },

  getRestaurantUserFavorites(name) {
    return favoriteDB.any(`SELECT username
                                          FROM users
                                          JOIN favorites
                                          ON users.id = user_id
                                          WHERE restaurant_name = $1`, name);
  },

  getUserRestaurantFavorites(user) {
    return favoriteDB.any(`SELECT restaurant_name
                                          FROM favorites
                                          WHERE user_id = $1
                                          `, user);
  },

  getUserCountFavorites(user) {
    return favoriteDB.any(`SELECT COUNT(restaurant_name)
                                          FROM favorites
                                          WHERE user_id = $1`, user);
  },

  alreadyFavorites(user) {
    return favoriteDB.one(`SELECT *
                                          FROM favorites
                                          WHERE user_id = $[user_id]
                                          AND restaurant_name = $[restaurant_name]`, user);
  },
};
