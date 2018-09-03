#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const axios = require('axios');

var ids_file = fs.createWriteStream(`${__dirname}/ids.log`, {flags : 'w'});

function apiCall (query) {
  return axios.get(`http://139.59.177.209/api/proxy/${query}`, {
    auth: {
      username: 'api',
      password: 'veryveryveryhardpassword'
    }
  })
}

function getProducts(page) {
  // return apiCall(`getProducts&pageNo=${page}`)
  return apiCall(`getProducts&recordsOnPage=1000&pageNo=${page}`)
}

const productIDs = []

main = async (page) => {
  page = page || 0
  console.log(`Total products: ${productIDs.length}`)
  console.log(`\tstarted page ${page}`)
  const {data} = await getProducts(page)
  console.log(data.records)
  if (data.records.length === 0) {
    console.log('wrote to id-s ids.log')
    return
  }
  const ids = data.records.map(p => p.productID)
  productIDs.push(...ids)
  ids_file.write(util.format(`[${productIDs}]`) + '\n')
  console.log(`\tended page ${page}`)
  main(++page)
}

main(1)
