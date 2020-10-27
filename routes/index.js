'use strict';

const { Router } = require('express');
const axios = require('axios');
const router = new Router();
const uniswapData = require('../data/uniswap')
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

router.get('/uniswap-gas',(req,res,next)=>{
  const data = uniswapData;
  const aggregatedData = {};

  data.map(contract =>{
    contract.map(value=>{
      if (!aggregatedData[value[0]/1000]) {
        aggregatedData[value[0]/1000]={
          ethPrice: value[2],
          ethFeesSpent:value[7],
          usdFeesSpent:value[8],
          ethFeesUsed:value[9],
          usdFeesUsed:value[10]
        };
      } else {
        aggregatedData[value[0]/1000]={
          ethPrice: value[2],
          ethFeesSpent:aggregatedData[value[0]/1000].ethFeesSpent +value[7],
          usdFeesSpent:aggregatedData[value[0]/1000].usdFeesSpent +value[8],
          ethFeesUsed:aggregatedData[value[0]/1000].ethFeesUsed +value[9],
          usdFeesUsed:aggregatedData[value[0]/1000].usdFeesUsed +value[10]
        };
      }
    });
  });
//console.log(aggregatedData)
const dates = Object.keys(aggregatedData).sort(function(a, b){return Number(a)-Number(b)});

res.json({dates,aggregatedData});

});



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
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});
  

module.exports = router;
