#!/usr/bin/env node
const csv = require('csvtojson')
const fs = require('fs');
const util = require('util');
const axios = require('axios');

const clientCode = 395963
const username = 'maanus'
const password = 'maanusleesment'

const verifyApiUserURL = `?clientCode=${clientCode}&username=${username}&password=${password}&request=verifyUser`
let images

const instance = axios.create({
  baseURL: 'https://395963.erply.com/api/'
});

async function fetchNewSession() {
  try {
    const { data } =  await instance.post(verifyApiUserURL)
    session = data.records[0].sessionKey
    console.log('updated session', session)
  } catch (e) {
    console.log('session update error', e)
  }
}

fetchNewSession().then(() => {
  fs.readdir(`${__dirname}/img`, (err, items) => {
    const img = items[0]
    const id = img.split('.jpg')[0]
    fs.readFile(`${__dirname}/img/${img}`, {encoding: 'base64'}, async function(err, base64data) {
      axios.post(`https://395963.erply.com/api/saveProductPicture&picture=${base64data}&productID=${id}&clientCode=${clientCode}&sessionKey=${session}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // console.log(data)
    });

    // items.forEach(img => {

    // })
  });
})
