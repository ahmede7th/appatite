const favoriteDB = require('../config/connection');

module.exports = {
  updateFavorite(favorite) {
    return favoriteDB.one(`INSERT INTO favorites(username, restaurant_name)
                                          VALUES($[favorite.username], $[favorite.restaurant_name])
                                          RETURNING *`, favorite);
  },

  removeFavorite(favorite) {
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE username = $[favorite.username]
                                            AND restaurant_name = $[favorite.restaurant_name]`, favorite);
  },

  getFavorites(user) {
    return favoriteDB.any(`SELECT name
                                          FROM restaurants
                                          JOIN favorites
                                          ON favorites.username = $[user.username]
                                          GROUP BY name;`, user);
  },

  alreadyFavorites(user) {
    return favoriteDB.one(`SELECT *
                                          FROM likes
                                          WHERE username = $[user.username]
                                          AND restaurant_name = $[user.restaurant_name]`, user);
  },
};
