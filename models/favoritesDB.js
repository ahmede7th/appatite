const favoriteDB = require('../config/connection');
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,
restaurant_id INTEGER REFERENCES restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE NOT NULL,

module.exports = {
  updateFavorite(updateFavorite) {
    return favoriteDB.one(`INSERT INTO favorites(user_id, restaurant_id)
                                          VALUES($[user_id], $[restaurant_id])
                                          RETURNING *`, updateFavorite);
  },

  removeFavorite(updateFavorite) {
    return favoriteDB.none(`DELETE FROM favorites
                                            WHERE user_id = $[user]
                                            AND restaurant_id = $[restaurant]`, updateFavorite);
  },

  getFavorites(user) {
    return favoriteDB.any(`SELECT name
                                          FROM restaurants
                                          JOIN favorites
                                          ON favorites.user_id = user.id
                                          GROUP BY name;`, user);
  },

  alreadyFavorites(user) {
    return favoriteDB.one(`SELECT *
                                          FROM likes
                                          WHERE user_id = $[user]
                                          AND restaurant_id = $[restaurant]`, user);
  },
};
