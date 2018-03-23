const favoriteDB = require('../config/connection');

module.exports = {
  addFavorite(favorite) {
    return favoriteDB.one(`INSERT INTO favorites(user_id, restaurant_id)
                                          VALUES($[user_id], $[restaurant_id])
                                          RETURNING *`, favorite);
  },

  removeFavorite(favorite) {
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE user_id = $[user_id]
                                            AND restaurant_id = $[restaurant_id]`, favorite);
  },

  getRestaurantCountFavorites(name) {
    return favoriteDB.any(`SELECT COUNT(user_id)
                                          FROM favorites
                                          WHERE restaurant_id = $1
                                          `, name);
  },

  getRestaurantUserFavorites(name) {
    return favoriteDB.any(`SELECT username
                                          FROM users
                                          JOIN favorites
                                          ON users.id = user_id
                                          WHERE restaurant_id = $1`, name);
  },

  getUserRestaurantFavorites(user) {
    return favoriteDB.any(`SELECT restaurant_id
                                          FROM favorites
                                          WHERE user_id = $1
                                          `, user);
  },

  getUserCountFavorites(user) {
    return favoriteDB.any(`SELECT COUNT(restaurant_id)
                                          FROM favorites
                                          WHERE user_id = $1`, user);
  },

  alreadyFavorites(user) {
    return favoriteDB.one(`SELECT *
                                          FROM favorites
                                          WHERE user_id = $[user_id]
                                          AND restaurant_id = $[restaurant_id]`, user);
  },
};
