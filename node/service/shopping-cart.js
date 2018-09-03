async function path(ctx) {
  console.log('cart')
  ctx.body = 'cart'
}

exports.register = ({router}) => {
  router.get('/cart', path)
}
