const favoriteDB = require('../config/connection');

module.exports = {
  addFavorite(favorite) {
    console.log('INSIDE ADD FAVORITE');
    return favoriteDB.one(`INSERT INTO favorites(user_id, restaurant_name)
                                          VALUES($[user_id], $[restaurant_name])
                                          RETURNING *`, favorite);
  },

  removeFavorite(favorite) {
    console.log('INSIDE REMOVE FAVORITE');
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE user_id = $[user_id]
                                            AND restaurant_name = $[restaurant_name]`, favorite);
  },

  getFavorites(user) {
    console.log('INSIDE GETFAVORITES');
    return favoriteDB.any(`SELECT name
                                          FROM restaurants
                                          JOIN favorites
                                          ON favorites.user_id = $[user.user_id]
                                          GROUP BY name;`, user);
  },

  alreadyFavorites(user) {
    console.log('INSIDE ALREADY FAVORITES');
    return favoriteDB.one(`SELECT *
                                          FROM favorites
                                          WHERE user_id = $[user_id]
                                          AND restaurant_name = $[restaurant_name]`, user);
  },
};
