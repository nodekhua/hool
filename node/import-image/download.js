#!/usr/bin/env node
const csv = require('csvtojson')
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const csvFilePath=`${__dirname}/49075_32899.csv`
const exec = require('child_process').exec


function dedupe(arr) {
  return arr.reduce(function (p, c) {

    // create an identifying id from the object values
    var id = c.code

    // if the id is not found in the temp array
    // add the object to the output array
    // and add the key to the temp array
    if (p.temp.indexOf(id) === -1) {
      p.out.push(c);
      p.temp.push(id);
    }
    return p;

  // return the deduped array
  }, { temp: [], out: [] }).out;
}


var log_file = fs.createWriteStream(`${__dirname}/access.log`, {flags : 'a'});
var error_file = fs.createWriteStream(`${__dirname}/error.log`, {flags : 'a'});

const db = {}

const products = fs.readFileSync(`${__dirname}/products-file.json`, 'utf8');

let picProducts = JSON.parse(products)
                      .filter(a => a.code === a.name)
                      .filter(a => a.type ==='MATRIX')

picProducts = dedupe(picProducts)

let i = 0
csv({ delimiter: ';' })
.fromFile(csvFilePath)
  .on('json', async (jsonObj) => {
    const code = jsonObj.ARTNUM
    const url = jsonObj.PICTURE
    db[code] = url
  })
  .on('error', () => {
    console.log('error on csv file')
  })
  .on('end', () => {
    // a = picProducts.filter(a => !!db[a.code3])
    // console.log(a[1], db[a[1].code3])
     const productImgUrls = picProducts.map(a => ({
       url:db[a.code3],
       id: a.productID
     }))
     productImgUrls.forEach(({id, url}) => {
        exec(`wget "${url}"  -O ./img/${id}.jpg`)
     })
  })


/*

ARTNUM: 'dmh4212',
 CATEGORY_EN: 'Label Printers',
 SUBCATEGORY_EN: 'Industrial Printers',
 ITEMGROUP_EN: 'Honeywell H-Class',
 STOCK_QTY: '0',
 PACKING_UNIT: '1',
 SHORT_EN: 'Honeywell H-4212, 8 dots/mm (203 dpi), RTC, display, PL-Z, PL-I, PL-B, USB, RS232, LPT, Ethernet',
 LONG_EN: 'label printer, midrange printer, thermal transfer, 8 dots/mm (203 dpi), media width (max.): 118 mm, print width (max.): 104 mm, roll diameter (max.): 203mm, speed (max.): 304 mm/s, USB, RS232, parallel, Ethernet, emulation: PL-Z, PL-I, PL-B, RAM: 16 MB, Flash: 8 MB, real time clock, LCD Display, incl.: power supply unit, power cable (EU, UK), order separately: interface cable',
 DATASHEET_EN: 'https://www.jarltech.com/ger_new/new/pdf/en/datamax_h-class.pdf',
 WRRNTY_MON: '12',
 YOUR_PRICE_NET: '1498,02',
 ORIGINAL_ART_NO: 'C42-00-46000007',
 PICTURE: 'https://www.jarltech.com/ger_new/new/pix/products/web/datamax_h-class.jpg',
 MANUFACTURER: 'HONEYWELL',
 CURRENCY: 'EUR',
 DATE_PRICE_CHANGE: '2009-05-08',
 WEIGHT: '21,06',
 WARRANTY_EXTENSION: '0',
 PRE_EXCHANGE: '0',
 ITEM_TYPE: 'Version',
 FULLCOVER: '1',
 MOQ: '1',
 field23: '' }


*/
