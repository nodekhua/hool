const fs = require('fs');
const path = require('path');
var parse = require('csv-parse/lib/sync');

const { Category, MainProduct, Product } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const BASE_DIR = __dirname;

var parsed = {}

let filepath = path.resolve(BASE_DIR, "result/products_update.json");
parsed = JSON.parse(fs.readFileSync(filepath, "utf8"))


importFromJSON(parsed).then( () => {
  console.log("ended")
} )

// imports to DB
// parsedObject - [Products]
// returns Promise
function importFromJSON(parsedObject){
  let categoryObjects = parsedObject.categories;
  let main_productObjects = parsedObject.main_products;
  let productObjects = parsedObject.products;

  return Promise.all([updateProducts(productObjects)]);

  function createProducts(products){
    if (!products || products.length == 0) {
      return Promise.resolve(true);
    }
    let curProduct = products.shift();
    if (!curProduct){
      return Promise.resolve(true);
    }
    return Product.find({where: {original_number: curProduct.original_number}})
    .then( (prd) => {
      if(prd !== null) {
        delete curProduct.original_number;
        return prd.update(curProduct).then( () => {
          return createProducts(products)
        } )
      }
      return Promise.resolve(true)

    } )
  }


}

