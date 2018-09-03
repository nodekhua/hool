#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const axios = require('axios');

function apiCall (query) {
  return axios.get(`http://139.59.177.209/api/proxy/${query}`, {
    auth: {
      username: 'api',
      password: 'veryveryveryhardpassword'
    }
  })
}

function deleteProductPicture(id) {
  return apiCall(`deleteProductPicture&productID=${id}`)
}


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
  console.log(`\tended page ${page}`)
  main(++page)
}

fs.readFile('./ids.log', 'utf-8', async (err, ids) => {
    if (err) { throw err; }
    ids = JSON.parse(ids)
    for (var i = 7460; i < ids.length; i++) {
      const id = ids[i]
      const res = await deleteProductPicture(id)
      console.log(`${i}/${ids.length}`)
      if (res.records) {
        console.log(`\t ${id} ${JSON.stringify(res.data)}`)
      }
    }
});

/*
function deletePagePictures(page) {
      if (data.records.length) {
        data.records.forEach(async product => {
          const {
            productID
          } = product
          setTimeout(async () => {
            await axios.get(`http://139.59.177.209/api/proxy/deleteProductPicture&productID=${productID}`, {
              auth: {
                username: 'api',
                password: 'veryveryveryhardpassword'
              }
            })
            .then(() => {
              log_file.write(util.format(`${new Date()} deleteProductPicture`) + '\n');
            })
            .catch((e) => {
              error_file.write(util.format(`${new Date()} deleteProductPicture ${JSON.stringify(e.message)}`) + '\n');
            })
          }, counter++ * 1000)
        })
      } else {
        console.log("No more pages ", page)
      }
    })
    .catch((e) => {
      error_file.write(util.format(`${new Date()} ${JSON.stringify(e.message)}`) + '\n');
    })
}
*/
