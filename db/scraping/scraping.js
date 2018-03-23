//name+, rating+, cuisine+, img_src+, loc+
const axios = require('axios');
//let term='chinese';
// let term='american';
let term = 'italian';
// let term='korean';
//let term='indian';
let id = [];
let location = 'newyork'

let full = 'name--------------rating----------cuisine----------img_src-----------loc\n'
let reviews = [];

function concat(response) {

  for (let i = 0; i < 20; i++) {
    //console.log(response.data.businesses[i].id, )
    id += response.data.businesses[i].id
    full += '(' + '\'' + response.data.businesses[i].id + '\''
    full += ',' + response.data.businesses[i].rating
    // full += '   ' + response.data.businesses[i].coordinates.latitude
    // full += '   ' + response.data.businesses[i].coordinates.longitude
    full += ',' + '\'' + response.data.businesses[i].categories[0].title + '\''
    full += ',' + '\'' + response.data.businesses[i].image_url + '\''
    full += ',' + '\'' + response.data.businesses[i].location.display_address + '\'' + '),\n'
    console.log(full)
    console.log('\n <--------------->')
    console.log(response.data.businesses[0].categories[0].title)
    console.log('---->',id)
    //getAllReviews(id)
    // axios({
    //   method: 'get',
    //   url: `https://api.yelp.com/v3/businesses/${id}/reviews`,
    //   headers: {
    //     Authorization: 'Bearer _xTx5LGGUCl2acQlp0pANIpbQ1L-bxdG3C15i4AKKBt_lWRX-MczS2YmW8BGD5vEFqCeCIu8BN3rWPAm2GIx94xphS1pkceYx6vjYKO4OV52oidIwpsjWMjIPEu0WnYx'
    //   }
    // }).then(response=>{
    //    for (let i=0;i<3;i++)
    //    {
    //      reviews += response.data.reviews[i]
    //    }
    //   console.log('REVIEWS-----',response.data.reviews[i])
    // }).catch(err => {
    //   console.log('api error',err)
    // })
  }
}


// function forLoop(response){
//
//
// }




function getAllYelp(req, res) {
  axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    headers: {
      Authorization: 'Bearer _xTx5LGGUCl2acQlp0pANIpbQ1L-bxdG3C15i4AKKBt_lWRX-MczS2YmW8BGD5vEFqCeCIu8BN3rWPAm2GIx94xphS1pkceYx6vjYKO4OV52oidIwpsjWMjIPEu0WnYx'
    }
  }).then(response => {
    concat(response)

  }).catch(err => {
    console.log('api error', err);
  })
}

function getAllReviews(test) {

  axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/${test}/reviews`,
    headers: {
      Authorization: 'Bearer _xTx5LGGUCl2acQlp0pANIpbQ1L-bxdG3C15i4AKKBt_lWRX-MczS2YmW8BGD5vEFqCeCIu8BN3rWPAm2GIx94xphS1pkceYx6vjYKO4OV52oidIwpsjWMjIPEu0WnYx'
    }
  }).then(response => {
    console.log('REVIEWS-----', response.data)
  }).catch(err => {
    console.log('api error', err)
  })

}

// INSERT INTO restaurants(name, rating, cuisine, img_src, loc) VALUES
// (
//   'Caseys Palace',
//   4,
//   'Everything but the plate',
//   'img_src',
//   0
// ),

getAllYelp();



for (let i =0;i<id.length;i++)
{
console.log('ID------->',id[i])
}
