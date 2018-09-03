const fs = require('fs')
const http = require('http')
const axios = require('axios')
const pdf = require('html-pdf')
const path = __dirname + '/../downloads/invoices/pdf/'

module.exports = {
  generatePdf: async (url) => {
    const html = await axios.get(url)
    const id = Date.now();
    const filename = id + '_invoice.pdf'
    const options = {
        orientation: 'Portrait',
        format: 'A4'
    }
    const file = path + filename
    pdf.create(html.data, options).toFile(file, function(err, res) {
      if (err) return console.log(err);
    });

    return { filename: filename, id: id }
  },
  showInvoice: async (id) => {
    const file = path + id + '_invoice.pdf'
    return fs.createReadStream(file);
  }
}