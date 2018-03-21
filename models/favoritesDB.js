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

  getTotalFavorites(name) {
    console.log('INSIDE GET TOTAL FAVORITES');
    return favoriteDB.any(`SELECT COUNT(user_id)
                                          FROM favorites
                                          WHERE restaurant_name = $[name]
                                          `, name);
  },

  getUserFavorites(user) {
    console.log('INSIDE GETUSERFAVORITES');
    return favoriteDB.any(`SELECT restaurant_name
                                          FROM favorites
                                          WHERE user_id = $[user_id]
                                          `, user);
  },

  alreadyFavorites(user) {
    console.log('INSIDE ALREADY FAVORITES');
    return favoriteDB.one(`SELECT *
                                          FROM favorites
                                          WHERE user_id = $[user_id]
                                          AND restaurant_name = $[restaurant_name]`, user);
  },
};
