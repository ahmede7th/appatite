const favoriteDB = require('../config/connection');

module.exports = {
  updateFavorite(favorite) {
    return favoriteDB.one(`INSERT INTO favorites(user_id, restaurant_name)
                                          VALUES($[favorite.username], $[favorite.restaurant_name])
                                          RETURNING *`, favorite);
  },

  removeFavorite(favorite) {
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE user_id = $[favorite.username]
                                            AND restaurant_name = $[favorite.restaurant_name]`, favorite);
  },

  getFavorites(user) {
    return favoriteDB.any(`SELECT name
                                          FROM restaurants
                                          JOIN favorites
                                          ON favorites.user_id = $[user.username]
                                          GROUP BY name;`, user);
  },

  alreadyFavorites(user) {
    return favoriteDB.one(`SELECT *
                                          FROM favorites
                                          WHERE user_id = $[user.username]
                                          AND restaurant_name = $[user.restaurant_name]`, user);
  },
};
