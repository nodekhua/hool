const OrderService = require('../service/order')
const { Cart, Product, Order, User } = require('../models')
const messages = require('../languages/main')
const emailHelper = require('../helper/email')

async function path(ctx) {
  ctx.body = 'cart'
}

async function addToCart (ctx) {
  const { product, quantity, userId, language } = ctx.request.body
  const order = await getOrder(userId)
  const existingProductInCart = await Cart
    .findOne({
      where: {
        product_id: product,
        order_id: order.id
      }
    })
  if (!existingProductInCart) {
    const newProduct = Cart.build({
      product_id: product, 
      quantity: quantity,
      order_id: order.id
    })

    await newProduct.save()
    ctx.body = {message:messages[language]['Product added to cart'], statusText: "success"}
    return
  }

  const result = await existingProductInCart.update({
    quantity: quantity
  })
  ctx.body = {message:messages[language]['Cart updated'], statusText: "success"};
  return
}

async function sellSimilar (ctx) {
  const { product, quantity, userId, language } = ctx.request.body
  const resUser = await User
    .findOne({
        where: {
          id: userId
        }
    })
  if (!resUser) {
    ctx.throw(401, messages[language]['User was not found'])
  }

  let html = ""
  html += "<p>Seller: " + resUser.id + "</p>"
  html += "<p>Product code: " + product + "</p>"
  html += "<p>quantity: " + quantity + "</p>"

  const mailOptions = {
    from: resUser.email,
    to: process.env.NODEMAILER_SENDER_EMAIL,
    subject: messages[language]['Sell request'],
    html: html
  }

  await emailHelper.send(mailOptions)

  ctx.throw(200, messages[language]['Message sent']);
}

async function getCartProducts (ctx) {
  const order = await getOrder(ctx.params.userId)
  const products = await Cart
    .findAll({
      include: [{
        model: Product,
        as: 'Product'
      }],
      where: {
        order_id: order.id
      }
    })

  ctx.body = products
}

async function deleteFromCart (ctx) {
  const response = await Cart.destroy({
    where: {
      id: ctx.params.id
    }
  })

  ctx.body = response
}

async function getOrder(user_id) {
  let existingOrder = await Order
    .findOne({
      where: {
        status: 'creation',
        user_id: user_id
      }
    })

  if (!existingOrder) {
    return createOrder(user_id)
  }

  return existingOrder
}

async function createOrder(user_id) {
  const newOrder = Order.build({
    user_id: user_id
  })

  await newOrder.save()
  return await getOrder(user_id)
}

exports.register = ({router}) => {
  router.post('/add_to_cart', addToCart)
  router.post('/sell_similar', sellSimilar)
  router.get('/get_cart_products/:userId', getCartProducts)
  router.delete('/delete_from_cart/:id', deleteFromCart)
}