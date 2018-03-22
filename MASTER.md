#GET /api/user/:id
Returns information about one specific user based on username in the database.
{
  "message": "Got user",
  "data": {
    "user": {
      "id": 1,
      "fname": "Casey",
      "lname": "Harding",
      "username": "CR "Harding"",
      "password": "Casey",
      "auth": 1,
      "loc": 0,
      "date_created": "2018-03-17 14:06:33.717286"
    }
  }
}

#POST /api/user
Adds a user to the database.
{
  "message": "ok",
  "data" : {
    "user": {
      "id": 1,
      "fname": "Casey",
      "lname": "Harding",
      "username": "CR "Harding"",
      "password": "Casey",
      "auth": 1,
      "loc": 0,
      "date_created": "2018-03-17 14:06:33.717286"
    }
  }
}

#GET /api/user/edit/:id
Gets a specific users information based on their username to use for updating user information.
{
  "message": "Got user",
  "data": {
    "user": {
      "id": 1,
      "fname": "Casey",
      "lname": "Harding",
      "username": "CR "Harding"",
      "password": "Casey",
      "auth": 1,
      "loc": 0,
      "date_created": "2018-03-17 14:06:33.717286"
    }
  }
}

#PUT /api/user/edit/:id
Edits a users information, based on that users' username in the database.
{
  "message": "ok",
  "data": {
    "id": 1,
    "fname": "Casey",
    "lname": "Harding",
    "username": "CR "Harding"",
    "password": "Casey",
    "auth": 1,
    "loc": 0,
    "date_created": "2018-03-17 14:06:33.717286"    
  }
}

#DELETE /api/user/delete/:id
Deletes a user from the database, based on that users username.
{
 "message": "ok"
}

-----------------------------------------

#GET /api/restaurant
Gets the information about every restaurant currently in the database.
{
  "message": "ok",
  "data": {
    "restaurants": [
    {
      "id": 1,
      "name": "Caseys Palace",
      "rating": 4,
      "cuisine": "Everything but the plate",
      "img_src": "Eventual source of image",
      "loc": "Eventual location of restaurant",
      "date_created": "2018-03-17 14:06:33.725102"
    }  
    {
      "id": 2,
      "name": "Toms Garden",
      "rating": 4,
      "cuisine": "I have friend chicken so good that it will make your toes curl!",
      "img_src": "Eventual source of image",
      "loc": "Eventual location of restaurant",
      "date_created": "2018-03-17 14:06:33.725102"
    }
    ]
  }
}

#GET /api/restaurant/:id
Gets a specific restaurant from the database based on that restaurants name in the database.
{
  "message": "Got restaurant",
  "data": {
    "restaurant": {
      "id": 1,
      "name": "Caseys Palace",
      "rating": 4,
      "cuisine": "Everything but the plate",
      "img_src": "Eventual source of image",
      "loc": "Eventual location of restaurant",
      "date_created": "2018-03-17 14:06:33.725102"
    }
  }
}

#POST /api/restaurant/
Creates a new restaurant in the database, returning the information about that restaurant.
{
  "message": "ok",
  "data": {
    "restaurant": {
      {
        "id": 2,
        "name": "Toms Garden",
        "rating": 4,
        "cuisine": "I have friend chicken so good that it will make your toes curl!",
        "img_src": "Eventual source of image",
        "loc": "Eventual location of restaurant",
        "date_created": "2018-03-17 14:06:33.725102"
      }
    }
  }
}

#GET /api/restaurant/edit/:id
Gets one restaurant in the database based on that restaurants name to be used to edit that restaurant.
{
  "message": "Got restaurant",
  "data": {
    "restaurant": {
      "id": 1,
      "name": "Caseys Palace",
      "rating": 4,
      "cuisine": "Everything but the plate",
      "img_src": "Eventual source of image",
      "loc": "Eventual location of restaurant",
      "date_created": "2018-03-17 14:06:33.725102"  
    }
  }
}

#PUT /api/restaurant/edit/:id
Edits a restaurant in the database based on that restaurants name.
{
  "message": "ok",
  "data": {
    "restaurant": {
      "id": 1,
      "name": "Caseys Palace",
      "rating": 4,
      "cuisine": "Everything but the plate",
      "img_src": "Eventual source of image",
      "loc": "Eventual location of restaurant",
      "date_created": "2018-03-17 14:06:33.725102",
    }
  }
}

#DELETE /api/restaurant/delete/:id
Deletes a restaurant from the database, based on that restaurants name in the database.
{
  "message": "restaurant deleted"
}


---------------------------------------


#GET /api/review/:id
Gets all reviews for the specific restaurant based on the restaurants' name in the database.
{
  "message": "ok",
  "data": {
    "restaurantReviews": {
        "id": 1,
        "user_id": 1,
        "restaurant_name": "Caseys Palace",
        "content": "I had a terrible time at this restaurant. Casey is a big phoney and a jerk. His food tasted like cardboard. I would give this restaurant 0 stars if I could...",
        "date_created": "2018-03-17 14:06:33.725102"
    }
    {
      "id": 2,
      "user_id": 3,
      "restaurant_name": "Nicoles Ice Cream Castle",
      "content": "Best damn ice cream I have ever had in my life!",
      "date_created": "2018-03-17 14:06:33.725102"
    }
  }
}

#POST /api/review
Adds a review to the database.
{
  "message": "ok",
  "data": {
    "review": {
      "id": 3,
      "user_id": 15,
      "restaurant_name": "Muhammads House of Grilled Cheese",
      "content": "What can I say that hasn't already been said...grilled cheese, good beer, relaxed environment. I would live her if my wife would let me.",
      "date_created": "2018-03-17 14:06:33.725102"
    }
  }
}

#GET /api/review/user/:id
Gets all reviews made by a specific user based on that users username in the database.
{
  "message": "ok",
  "data": {
    "userReviews": {
      {
         "id": 1,
         "user_id": 1,
         "restaurant_name": "Caseys Palace",
         "content": "I had a terrible time at this restaurant. Casey is a big phoney and a jerk. His food tasted like cardboard. I would give this restaurant 0 stars if I could...",
         "date_created": "2018-03-17 14:06:33.725102"
     }
     {
       "id": 1,
       "user_id": 3,
       "restaurant_name": "Nicoles Ice Cream Castle",
       "content": "Best damn ice cream I have ever had in my life!",
       "date_created": "2018-03-17 14:06:33.725102"
     }
    }
  }
}

#GET /api/review/edit/:id
Gets a review from the database based on that reviews id to be used to edit.
{
  "message": "ok"
  "data": {
    "review": {
      "id": 23,
      "user_id": 3443,
      "restaurant_name": "The French Laundry",
      "content": "Pretentious. Expensive. Not worth the brick the shithouse is build out of.",
      "date_created": "2018-03-17 14:06:33.725102"
    }
  }
}

#PUT /api/review/edit/:id
Edits a review based on that reviews id in the database.
{
  "message": "ok",
  "data": {
    "review": {
      "id": 23,
      "user_id": 3443,
      "restaurant_name": "The French Laundry",
      "content": "Pretentious. Expensive. Not worth the brick the shithouse is build out of.",
      "date_created": "2018-03-17 14:06:33.725102"
    }
  }
}

#DELETE /api/review/delete/:id
Deletes a review from the database.
{
  "message": "deleted review"
}



-------------------

/api/favorites

#POST /api/favorites/user
Gets the names of all restaurants that a user has favorited, based on the currently logged in user
{
  "message": "ok",
  "data": [
  {"restaurant_name": "Caseys Palace"},
  {"restaurant_name": "The French Laundry"}
  }
}

#GET /api/favorites/:id
Gets the total number of favorites for the restaurant based on the restaurant name in req.params.id
{
  "message": "ok",
      "data": [
        {"count": "1"}
      ]
  ]
}

#POST /api/favorites/:id
Either adds a user / restaurant key value pair to the favorites table or deletes it

#GET /api/favorites/number
Gets the total number of favorites that the current user has made
{
  "message": "ok",
    "data": [
      {"count": "0"}
    ]
}
