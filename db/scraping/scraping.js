//name+, rating+, cuisine+, img_src+, loc+
const axios = require('axios');

//let term='chinese';
// let term='american';
// let term='italian';
// let term='korean';
 let term='indian';

let location = 'newyork'

let full = 'name--------------rating----------cuisine----------img_src-----------loc\n'

function getAllYelp(req, res) {
  axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    headers: {
      Authorization: 'Bearer xJjNsj4RmbcDR8jxrabVdG5hRpgkvMRStRNwJC5OurUUy14vSSgKyqTCQ-wZ0NbuM7Jg4yj8_il2FVeVSgC3Usd7D_Xvf6v6OVJ3gSedXlOpcJzl8VWleQHRDPyuWnYx'
    }
  }).then(response => {

    for (let i = 0; i < 20; i++) {
      //console.log(response.data.businesses[i].id, )
      full += '(' + '\''+response.data.businesses[i].name+'\''
      full += ',' + response.data.businesses[i].rating
      // full += '   ' + response.data.businesses[i].coordinates.latitude
      // full += '   ' + response.data.businesses[i].coordinates.longitude
      full += ',' + '\''+response.data.businesses[i].categories[0].title+'\''
      full += ',' + '\''+response.data.businesses[i].image_url+'\''
      full += ',' + '\''+response.data.businesses[i].location.display_address+'\'' + '),\n'
    }
    console.log(full)
    console.log('\n <--------------->')
    console.log(response.data.businesses[0].categories[0].title)

  }).catch(err => {
    console.log('api error', err);
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
