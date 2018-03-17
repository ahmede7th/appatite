
const reviewDB = require('../config/connection');

module.exports = {
  getAllReviewsByRestaurantName(restaurantId) {
    return reviewDB.any(`SELECT * FROM reviews
                                          WHERE restaurant_name = $1`, restaurantName);
  },

  getAllReviewsByUsername(username) {
    return reviewDB.any(`SELECT * FROM reviews
                                          WHERE username = $1`, username);
  },

  addReview(review) {
    return reviewDB.one(`INSERT INTO reviews(username, restaurant_name, content)
                                          VALUES($[review.username], $[review.restaurant_name], $[review.content])
                                          RETURNING *`, review);
  },

  getYourReviews(review) {
    return reviewDB.any(`SELECT username, restaurant_name, content, id, date_posted
                                          FROM reviews
                                          WHERE username = $1`, review);
  },

  getPublicReviews(user) {
    return reviewDB.any(`SELECT username, restaurant_name, content, id, date_posted
                                          FROM reviews
                                          WHERE username != $1
                                          `, user);
  },

  getFriendReviews(friend) {
    return reviewDB.any(`SELECT username, content
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
    return reviewDB.one(`UPDATE reviews SET content = $[review.content]
                                          WHERE id = $[review.id]
                                          RETURNING *`, review);
  },

  deleteReview(review) {
    return reviewDB.none(`DELETE FROM reviews WHERE id = $1`, review);
  },
};
