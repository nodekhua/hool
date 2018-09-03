const fs = require('fs');
const path = require('path');
var parse = require('csv-parse/lib/sync');

const { Category, MainProduct, Product } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

const BASE_DIR = __dirname;

var parsed = {}

let filepath = path.resolve(BASE_DIR, "result/products.json");
parsed["products"] = JSON.parse(fs.readFileSync(filepath, "utf8"))

filepath = path.resolve(BASE_DIR, "result/main_products.json");
parsed["main_products"] = JSON.parse(fs.readFileSync(filepath, "utf8"))

filepath = path.resolve(BASE_DIR, "result/categories.json");
parsed["categories"] = JSON.parse(fs.readFileSync(filepath, "utf8"))

importFromJSON(parsed).then( () => {
  console.log("ended")
} )


// imports to DB
// parsedObject - {
//    products: [productObjects],
//    main_products: [main_productObjects],
//    categories: [categoryObjects]
//  }
// returns Promise
function importFromJSON(parsedObject){
  let categoryObjects = parsedObject.categories;
  let main_productObjects = parsedObject.main_products;
  let productObjects = parsedObject.products;

  return Promise.all([
    createCategories(categoryObjects).
    then( function(){
      console.log("end categories")
      return createMainProducts(main_productObjects)
    }).
    then( function(){
      console.log("end m_p")
      return createProducts(productObjects)
    })
    .then( function(){
      console.log("\n\nEND\n\n")
    })
  ]);

  function createCategories(categories){
    if (!categories || categories.length == 0) {
      return Promise.resolve(true);
    }
    let curCategory = categories.shift();
    if (!curCategory) {
      return Promise.resolve(true);
    }
    if (!curCategory.hasOwnProperty("temp")){
      curCategory["parent_category_id"] = null;
    }

    if ( curCategory.hasOwnProperty("temp") ){
      // curSubcategory["temp"] = { "parentName": curCategory["name"] };
      let name = curCategory["temp"]["parentName"];
      delete curCategory["temp"];
      return Category.find({where: {name: name}}).then(function(ob){
        curCategory["parent_category_id"] = ob.id;
        return Category.create(curCategory).then(function(){
          return createCategories(categories)
        })
      })
    }
    return Category.create(curCategory).then(function(){
      return createCategories(categories)
    })

      
  }

  function createMainProducts(main_products){
 // const mainProductSchema = {
 //    "ProductHierarchy4": "name",
 //    "Manufacturer": "manufacturer",
 //    "ProductFamilyImage": "picture",
 //    "SpecSheetURL": "datasheet",
 //  }
//   curMainProduct["temp"] = { "categoryName": curSubcategory["name"] }
    if (!main_products || main_products.length == 0) {
      return Promise.resolve(true);
    }
    let curMainProduct = main_products.shift();
    if (!curMainProduct){
      return Promise.resolve(true);
    }
    return MainProduct.find({where: { name: curMainProduct.name }})
    .then( mProd => {
      if (mProd !== null) {
        delete curMainProduct.name;
        return mProd.update(curMainProduct).then( () => {
          return createMainProducts(main_products);
        } )
      }

      if (curMainProduct.hasOwnProperty("temp")) {
        let catName = curMainProduct["temp"]["categoryName"];
        delete curMainProduct.temp;
        return Category.find({where: {
            name: catName,
            parent_category_id : {
            [Op.ne]: null
          }
        }})
        .then( cat => {
          curMainProduct["subcategory_id"] = cat.id;
          return MainProduct.create(curMainProduct)
          .then( () => {
            return createMainProducts(main_products)
          } )
        } )
      } else {
        return Promise.resolve(true)
      }
    } )
  }

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
      } else {
        return Product.create(curProduct)
        .then( () => {
          return createProducts(products)
        } )
      }

    } )
  }


}

