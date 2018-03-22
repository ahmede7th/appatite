
const reviewDB = require('../config/connection');

module.exports = {
  getAllReviewsByRestaurantName(restaurantName) {
    return reviewDB.any(`SELECT * FROM reviews
                                          WHERE restaurant_name = $1`, restaurantName);
  },

  getAllReviewsByUsername(username) {
    return reviewDB.any(`SELECT * FROM reviews
                                          WHERE user_id = $1`, username);
  },

  addReview(review) {
    return reviewDB.one(`INSERT INTO reviews(user_id, restaurant_name, content)
                                          VALUES($[user_id], $[restaurant_name], $[content])
                                          RETURNING *
                                          `, review);
  },

  getYourReviews(review) {
    return reviewDB.any(`SELECT user_id, restaurant_name, content, id, date_posted
                                          FROM reviews
                                          WHERE user_id = $1`, review);
  },

  getPublicReviews(user) {
    return reviewDB.any(`SELECT user_id, restaurant_name, content, id, date_posted
                                          FROM reviews
                                          WHERE user_id != $1
                                          RETURNING *
                                          `, user);
  },

  getFriendReviews(friend) {
    return reviewDB.any(`SELECT user_id, content
                                          FROM reviews
                                          WHERE username = $1
                                          `, friend);
  },

  getReviewById(review) {
    return reviewDB.one(`SELECT *
                                          FROM reviews
                                          WHERE id = $1`, review);
  },

  editReview(review) {
    return reviewDB.one(`UPDATE reviews SET content = $[content]
                                          WHERE id = $1
                                          RETURNING *`, review);
  },

  deleteReview(review) {
    return reviewDB.none(`DELETE FROM reviews WHERE id = $1`, review);
  },
};
