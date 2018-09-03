const { Order, Cart, User, Product, sequelize, PricingRanges, Discount } = require('../models');
const Erply = require('./erply.js')
const email = require('../helper/email')
const invoices = require('../helper/invoices')
const messages = require('../languages/main')

async function storeOrder(ctx) {
  ctx.body = {}
  const user = await getUser(ctx.params.user_id)
  if (!user) {
    ctx.throw('401')
  }
  // const origin = ctx.request.header.origin
  const order = await getOrder(ctx.params.user_id)
  // const language = ctx.request.body.language
  const fee = await getPricingRanges()
  const discountList = await getDiscounts()
  const customer = await getCustomerFromErply(user)
  const salesDocument = await getSalesDocument(order, fee, discountList, customer)
  // const pdf = await invoices.generatePdf(salesDocument.data.records[0].invoiceLink)
  // const html = createEmailHtml(messages, language, customer, salesDocument, origin, pdf)
  // const mailOptions = {
  //   from: process.env.NODEMAILER_SENDER_EMAIL,
  //   to: customer.email,
  //   subject: messages[language]['Hool.ee new invoice'],
  //   html: html
  // };
  // await email.send(mailOptions)
  // const receiver2 = 'arved@hool.ee'
  // const mailOptions2 = {
  //   from: process.env.NODEMAILER_SENDER_EMAIL,
  //   to: receiver2,
  //   subject: messages[language]['Hool.ee new invoice'],
  //   html: html
  // };
  // await email.send(mailOptions2)
  // await updateOrder(order, pdf, discountList)
  ctx.body = salesDocument.data.records[0]
}

async function getSalesDocument (order, fee, discountList, customer) {
  // let url = `?request=saveSalesDocument&customerID=${customer.customerID}&type=order`
  // let productIndex = 0
  // for (let i in order.Carts) {
  //   productIndex = parseInt(i) + 1
  //   let subTotoalPrice = getProductPrice(order.Carts[i].Product.price, order.Carts[i].quantity, fee, discountList)
  //   url += `&productID` + productIndex + `=${order.Carts[i].Product.productID}&amount` + productIndex + `=${order.Carts[i].quantity}&price` + productIndex + `=${subTotoalPrice}`
  // }
  // productIndex += 1
  // url += `&productID` + productIndex + `=991992&amount` + productIndex + `=1&price` + productIndex + `=6`
  // console.log(url)
  //url += addDeloveruProduct(productIndex + 1)

  // let url = '?request=getProductGroups' 

  // const groups = await Erply.proxy(url)

  // console.log('>>>>>>>> groups', groups.data.records)

  let url = `?request=saveProduct&productID=991992&type=PRODUCT&groupID=110&name=Delivey`

  // let url = `?request=getProducts&productID=991992`

  // const salesDocument = await Erply.proxy(url)

  // console.log('>>>>>>>> salesDocument', salesDocument)
  return salesDocument
}

function addDeloveruProduct (index) {
  return `&productID` + index + `991992=&amount` + index + `=1&price` + index + `=6`
}

async function updateOrder (order, pdf) {
  order.update({
    status: "stored",
    invoice_name: pdf.filename
  })
}

function createEmailHtml (messages, language, customer, salesDocument, origin, pdf) {
  const pdfUrl = origin + '/pdf/' + pdf.id
  let html = '<p>' + messages[language]['Dear customer, sales invoice PDF can be found here:'] + " " + pdfUrl + '</p>'
  html += '<p>' + messages[language]['HTML version of invoice:'] + " " + salesDocument.data.records[0].invoiceLink + '</p>'
  html += '<br><br><p>' + messages[language]['With best regards,'] + '</p>'
  html += '<p>' + messages[language]['Hool.ee team'] + '</p>'

  return html
}

async function getOrder (user_id) {
  let existingOrder = await Order
    .findOne({
      include: [{
        model: Cart,
        include: [{
          model: Product,
          as: 'Product'
        }],
      }],
      where: {
        status: 'creation',
        user_id: user_id
      }
    })

  if (!existingOrder) {
    const newOrder = Order.build({
      user_id: user_id
    })

    existingOrder = await newOrder.save()
  }

  return existingOrder
}

async function getUser(id) {
  const user = await User
    .findOne({
      where: {
        id: id
      }
    })

  return user || null
}

async function getCustomerFromErply(user) {
  const url = `?request=getCustomers&searchEmail=${user.email}`
  const customer  =  await Erply.proxy(url)

  if (customer.data.records.length < 1) {
    return createErplyCustomer(user)
  }

  return customer.data.records[0]
}

async function createErplyCustomer (user) {
    const url = `?request=saveCustomer&firstName=${user.first_name}&lastName=${user.last_name}&email=${user.email}&password=${user.password}&companyName=${user.company_name}&vatNumber=${user.vat_number}`
    const customer = await Erply.proxy(url)

    return customer.data.records[0]
}

async function getPricingRanges () {
  let fee = PricingRanges.findAll({
    where: {
      login: 1
    }
  })

  return fee;
}

async function getDiscounts () {
  let discounts = await Discount.findAll({
    include: [{
      model: PricingRanges,
      as: 'ranges',
      where: {
        login: 1
      }
    }]
  })

  return discounts
}

function getFeeforProduct (value, fee) {
  for (var i = 0; i < fee.length; i++) {
    if (fee[i].max_price && fee[i].max_price > value) {
      return { fee: fee[i].fee, max_price: fee[i].max_price }
    } else if (fee[i].min_price && fee[i].min_price < value) {
      return { fee: fee[i].fee, min_price: fee[i].min_price }
    }
  }
}

function getProductDiscount (price, quantity, fee, discountList) {
  let range = getFeeforProduct(price, fee)
  let count = 0
  let discounts = {
    min: {},
    max: {}
  }
  for (var i = 0; i < discountList.length; i++) {
    if (discountList[i].max_count) {
      if (!discounts.max[discountList[i].max_count]) {
        discounts.max[discountList[i].max_count] = []
      }
      discounts.max[discountList[i].max_count][discountList[i].ranges.max_price] = discountList[i]
    } else if (discountList[i].min_count) {
      if (!discounts.min[discountList[i].min_count]) {
        discounts.min[discountList[i].min_count] = []
      }
      discounts.min[discountList[i].min_count][discountList[i].ranges.max_price] = discountList[i]
    }
  }
  let discountsMax = Object.keys(discounts.max)
  let discountsMin = Object.keys(discounts.min)
  let flag = 'max'
  for (var i = 0; i < discountsMax.length; i++) {
    if (discountsMax[i] >= quantity) {
      count = discountsMax[i]
      flag = 'max'
      break
    }
  }
  for (var j = 0; j < discountsMin.length; j++) {
    if (discountsMin[j] <= quantity) {
      count = discountsMin[j]
      flag = 'min'
      break
    }
  }

  return discounts[flag][count][range.max_price || range.min_price].discount
}

function getProductPrice (price, quantity, pricingRanges, discountList) {
  let fee = getFeeforProduct(price, pricingRanges)
  let discount = 1 - getProductDiscount(price, quantity, pricingRanges, discountList) / 100
  let subtotal = price * fee.fee * discount

  return subtotal.toFixed(2)
}

exports.register = ({router}) => {
  router.post('/store_order/:user_id', storeOrder)
}