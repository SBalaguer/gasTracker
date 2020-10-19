'use strict';

const { Router } = require('express');
const axios = require('axios');
const router = new Router();
//const data = require('../data/contractInfo.json');

// const config = {
//   headers: { Authorization: `Bearer ${process.env.API_KEY_ALETHIO}` }
// };

// router.get('/gas', async (req, res, next) => {
//   try {
//     const response = await axios.get('https://api.aleth.io/v1/contracts/0xf164fc0ec4e93095b804a4795bbe1e041497b92a/transactions', config)
//     res.json(response);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// const getData = async (contract) => {
//   try{
//     const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${contract}&apikey=${process.env.API_KEY_ETHERSCAN}`)
//     return response.data.result
//   }catch(error){
//     return error
//   }
// }

router.get('/gas', async (req, res, next) => {
  try {
    const dayInfo = {};
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=0xbbc81d23ea2c3ec7e56d39296f0cbb648873a5d3&apikey=${process.env.API_KEY_ETHERSCAN}`)
    // res.json(response.data.result)
    response.data.result.map(tx=>{
      const day = new Date(Number(tx.timeStamp)*1000).getDate();
      const month = new Date(Number(tx.timeStamp)*1000).getMonth()+1;
      const year = new Date(Number(tx.timeStamp)*1000).getFullYear();
      const date = `${day}-${month}-${year}`;

      if (dayInfo[date]) {
        dayInfo[date]['gasCost'] += Number(tx.gasPrice) * Number(tx.gasUsed);
        dayInfo[date]['gasUsed'] += Number(tx.gasUsed);
        dayInfo[date]['gas'] += Number(tx.gas);
      } else {
        dayInfo[date]={
          gasCost:0,
          gasUsed:0,
          gas:0
        };
        dayInfo[date]['gasCost'] = Number(tx.gasPrice) * Number(tx.gasUsed);
        dayInfo[date]['gasUsed'] = Number(tx.gasUsed);
        dayInfo[date]['gas'] = Number(tx.gas);
      }
    });
    res.json(dayInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/gas', async (req, res, next) => {
  // const keys = Object.keys(req.body)
  console.log(req.body)
  try {
    const data = {};
    for (const key in req.body) {
      data[key]={};
      const contracts = req.body[key];
      const promises =  contracts.map(async contract => {
        //const dayInfo = {};
        const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${contract}&apikey=${process.env.API_KEY_ETHERSCAN}`)
        // res.json(response.data.result)
        //console.log('this is the response',response)
        response.data.result.map(tx=>{
          const day = new Date(Number(tx.timeStamp)*1000).getDate();
          const month = new Date(Number(tx.timeStamp)*1000).getMonth()+1;
          const year = new Date(Number(tx.timeStamp)*1000).getFullYear();
          const date = `${day}-${month}-${year}`;
        
          if (data[key][date]) {
            data[key][date]['gasCost'] += Number(tx.gasPrice) * Number(tx.gasUsed);
            data[key][date]['gasUsed'] += Number(tx.gasUsed);
            data[key][date]['gas'] += Number(tx.gas);
          } else {
            data[key][date]={
              gasCost:Number(tx.gasPrice) * Number(tx.gasUsed),
              gasUsed:Number(tx.gasUsed),
              gas:Number(tx.gas)
            };
          }
        });
      });
      await Promise.all(promises);
    }
    //console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
  

module.exports = router;
