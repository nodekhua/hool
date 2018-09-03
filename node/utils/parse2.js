const fs = require('fs');
const path = require('path');
var parse = require('csv-parse/lib/sync');

const { Category, MainProduct, Product } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

// const {Product, sequelize} = require('../models');

// STEP 1. parse .csv into .json with "models/product" objects
//      1.1 split into lines
//      1.2 split line[0] into column names
//      1.3 create schema
//      1.3 create objects like "models/product" done

// ??   What about associations ?? 

// STEP 2. commit them to database
//      2.1 connect db
//      2.2 check, if row exists
//        2.2.exists  update
//        2.2.not   create


// ???! What is SCA (source) 

const BASE_DIR = __dirname;


// for debug only!
const filepath = path.resolve(BASE_DIR, "Scansource2.txt");

let parsed = parseToJSON(filepath);


// generates .json result of csv from filepath
// filepath - path to csv file
// returns {
//   products: [productObjects],
//   main_products: [main_productObjects],
//   categories: [categoryObjects]
// }
function parseToJSON(filepath) {
  let file = fs.readFileSync(filepath, "utf8");

  let lines = file.split("\r\n");

  let colNames = parseLine(lines[0]);

  const productsSchema = {
    "ScanSourceItemNumber": "number",
    "BasicDescription": "name",
    "WebDescription": "description",
   // PK:
    "ManufacturerItemNumber": "original_number",
    "ContractPrice": "price",
    "QuantityAvailable": "quantity"
    // "main_product_name": "main_product_name"
    // "SCA": "source"
  }
  const productValues = {
    "warranty": null,
    "pre_exchange": null,
    "date_price_change": null,
    "fullcover": null,
    "primary": 0,
    "packing_unit": null
  }
  const productKeys = [
    "ScanSourceItemNumber",
    "BasicDescription",
    "WebDescription",
    "ManufacturerItemNumber",
    "GrossWeight",
    // "SCA",
    "ContractPrice",
    "QuantityAvailable"
  ]
  // Products => type    **?? Version | Accessories (| Products)

  const mainProductSchema = {
    "ProductHierarchy4": "name",
    "Manufacturer": "manufacturer",
    "ProductFamilyImage": "picture",
    "SpecSheetURL": "datasheet",
  }
  const mainProductKeys = [
    "ProductHierarchy4",
    "Manufacturer",
    "ProductFamilyImage",
    "SpecSheetURL"
  ]
  // ?? subcategory_id  **  ?? id in categories table
  // How is it possible to take id from uncreated category?
  // Need way to do this
  // e.g. another key(mb. just temp)

  const categoryKeys = [
    "ProductHierarchy3",
    "ProductHierarchy2"
  ]


  let products = [];
  let main_products = [];
  let categories = []

  for (let i = 1; i < lines.length; i++){
    let curLine = lines[i];
    let cells = parseLine(curLine);
    if (!cells) {
      continue;
    }

    let curProduct = {};
    let curMainProduct = {};
    let curCategory = {};
    let curSubcategory = {};

    for (let ci = 0; ci < colNames.length; ci++){
      let cell = createCell(colNames[ci], cells[ci]);

      if (cell === null){
        continue;
      }

      let payload = cell.payload;

      if (cell.table === "products"){
        curProduct[payload.key] = payload.value;
      }

      if (cell.table === "main_products"){
        if (payload.key == "name"){
          curProduct["main_product_name"] = payload.value;
        }
        curMainProduct[payload.key] = payload.value;
      }

      if (cell.table === "categories"){
        if (payload.topLevel === true){
          curCategory[payload.key] = payload.value;
        } else {
          curSubcategory[payload.key] = payload.value;
        }
      }
    }

    products.push(curProduct);
    curMainProduct["temp"] = { "categoryName": curSubcategory["name"] }
    main_products.push(curMainProduct);
    curSubcategory["temp"] = { "parentName": curCategory["name"] };
    categories.push(curCategory);
    categories.push(curSubcategory);
  }

  console.log("End reading")

  debugger;
  // Unique
  let uniqueArray = arr => [...new Set(arr.map(obj => JSON.stringify(obj)))].map(str => JSON.parse(str));

  let uniq_products = uniqueArray(products)

  console.log("End parsing products")

  let uniq_main_products = uniqueArray(main_products)
  console.log("End parsing main products")

  let uniq_categories = uniqueArray(categories)

  console.log("End parsing categories")

  console.log("End with parsing");

  // for debug
  saveJSON(uniq_products, uniq_main_products, uniq_categories);
  console.log("End with saving into JSON");

  // throw Error;

  return {
    "products": uniq_products,
    "main_products": uniq_main_products,
    "categories": uniq_categories
  };

  // saves data lists to .json files
  // prductsArray - array of product objects
  // mainProductsArray - array of main_product objects
  // categoriesArray - array of category objects
  function saveJSON(productsArray, mainProductsArray, categoriesArray){
    function writeCallback(err) {
      if (err) {
        console.log(err);
      }
    }

    let stringifyProducts = JSON.stringify(productsArray, null, 4);
    let stringifyMainProducts = JSON.stringify(mainProductsArray, null, 4);
    let stringifyCategories = JSON.stringify(categoriesArray, null, 4);

    let productResultPath = path.resolve(BASE_DIR, "result/products.json")
    fs.writeFileSync(
      productResultPath, 
      stringifyProducts, 
      writeCallback
      );

    let categoryResultPath = path.resolve(BASE_DIR, "result/categories.json")
    fs.writeFileSync(
      categoryResultPath, 
      stringifyCategories, 
      writeCallback
      );

    let mainProductResultPath = path.resolve(BASE_DIR, "result/main_products.json")
    fs.writeFileSync(
      mainProductResultPath, 
      stringifyMainProducts, 
      writeCallback
      );
  }

  // creates cell for def. table
  // key - Scansource2 column name
  // value - Scansource2 cell value
  // returns {"table": <table name>, "payload": <cell>}
  // returns null (if no such column in any tables)
  function createCell(key, value){
    key = String(key)
    if (productKeys.indexOf(key) +1){
      let payload = createProductCell(key, value);
      return {"table": "products", "payload": payload}
    }
    if (mainProductKeys.indexOf(key) +1){
      let payload = createMainProductCell(key, value);
      return {"table": "main_products", "payload": payload}
    }
    if (categoryKeys.indexOf(key) +1){
      let payload = createCategoryCell(key, value);
      return {"table": "categories", "payload": payload}
    }
    return null;
  }

  // creates pair key-value appliable to products table
  //   or returns null if no such column in table 
  // key - Scansource2 column name
  // value - Scansource2 cell value
  // returns {key: <appliableKey>, value: <appliableValue>}
  // returns null (if no such column in table)
  function createProductCell(key, value){
    if (key === "GrossWeight") {
      let appliable = {};
      appliable["key"] = "weight";
      appliable["value"] = value*0.453592;
      return appliable;
    }
    if ( productsSchema.hasOwnProperty(key) ) {
      let appliableKey = productsSchema[key];
      let appliable = {};
      appliable["key"] = appliableKey;
      appliable["value"] = value;
      return appliable;
    }
    return null;
  }

  // creates pair key-value appliable to main_products table
  //   or returns null if no such column in table 
  // key - Scansource2 column name
  // value - Scansource2 cell value
  // returns {key: <appliableKey>, value: <appliableValue>}
  // returns null (if no such column in table)
  function createMainProductCell(key, value){
    // if (key === "")
    if ( mainProductSchema.hasOwnProperty(key) ){
      let appliable = {};
      let appliableKey = mainProductSchema[key];
      appliable["key"] = appliableKey;
      appliable["value"] = value;
      return appliable;
    }
    return null;
  }

  // creates pair key-value appliable to categories table
  //   or returns null if no such column in table 
  // key - Scansource2 column name
  // value - Scansource2 cell value
  // returns {key: <appliableKey>, value: <appliableValue>}
  // returns null (if no such column in table)
  function createCategoryCell(key, value){
    let appliable = {};
    if ( ["ProductHierarchy3", "ProductHierarchy2"].indexOf(key) +1 ){
      appliable["key"] = "name";
      appliable["value"] = value;
    }
    if (key === "ProductHierarchy2") {
      appliable["topLevel"] = true;
    }
    return appliable;
  }

  // returns [string,] from csv line
  function parseLine(line){
    // console.log(line)
    return parse(line)[0];
  }
}
