#!/usr/bin/env node
const csv = require('csvtojson')
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const csvFilePath=`${__dirname}/49075_32899.csv`

var log_file = fs.createWriteStream(`${__dirname}/access.log`, {flags : 'a'});
var error_file = fs.createWriteStream(`${__dirname}/error.log`, {flags : 'a'});
var products_file = fs.createWriteStream(`${__dirname}/products-file.json`, {flags : 'w'});

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

const products = []

main = async (page) => {
  page = page || 0
  console.log(`Total products: ${products.length}`)
  console.log(`\tstarted page ${page}`)
  const {data} = await getProducts(page)
  if (data.records.length === 0) {
    products_file.write(util.format(JSON.stringify(products)))
    return
  }
  products.push(...data.records)
  console.log(`\tended page ${page}`)
  main(++page)
}

main(1)
