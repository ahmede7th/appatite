const axios = require('axios');
module.exports = {

  getAllYelp(req,res,next){
    console.log('GETTING ALL YELP');
  axios({
    method:'get',
    url:`https://api.yelp.com/v3/businesses/search?term=${req.body.term}&location=${req.body.location}`,
    headers: {
      Authorization: 'Bearer xJjNsj4RmbcDR8jxrabVdG5hRpgkvMRStRNwJC5OurUUy14vSSgKyqTCQ-wZ0NbuM7Jg4yj8_il2FVeVSgC3Usd7D_Xvf6v6OVJ3gSedXlOpcJzl8VWleQHRDPyuWnYx'
    }
  })
  .then(response=>{
    console.log('worked')
    res.json({
      message:'ok',
      data:response.data
    })
  })
  .catch(err => {
    console.log('api error', err);
    next(err);
  })
},

getAllYelpReviews(req,res,next){
  axios({
    method:'get',
    url:`https://api.yelp.com/v3/businesses/${req.body.id}/reviews`,
    headers:{
      Authorization: 'Bearer xJjNsj4RmbcDR8jxrabVdG5hRpgkvMRStRNwJC5OurUUy14vSSgKyqTCQ-wZ0NbuM7Jg4yj8_il2FVeVSgC3Usd7D_Xvf6v6OVJ3gSedXlOpcJzl8VWleQHRDPyuWnYx'
    }
  })
  .then(response =>{
    console.log('worked')
    res.json({
      message:'ok',
      data:response.data
    })
  })
  .catch(err => {
    console.log('api error', err)
    next(err);
  })
}

}
