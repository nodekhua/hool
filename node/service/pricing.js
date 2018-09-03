const { PricingRanges, Discount } = require('../models')

async function getFee (ctx) {
  const { authenticated } = ctx.params
  // const { max_price, authenticated }= ctx.params.max_price
  // let query = "SELECT * , abs(`max_price` - " + max_price + ") as abs FROM `pricing_ranges` "
  // query += "WHERE `max_price` is NOT null and `login`= " + authenticated + " and `max_price` > " + max_price + " order by abs LIMIT 1"

  // const result = await sequelize.query(query)
  let result = await PricingRanges.findAll({
    where: {
      login: authenticated == "true" ? 1 : 0
    }
  })

  ctx.body = result
}

async function getDiscounts (ctx) {
  const { authenticated } = ctx.params
  
  let result = await Discount.findAll({
    include: [{
      model: PricingRanges,
      as: 'ranges',
      where: {
        login: authenticated == "true" ? 1 : 0
      }
    }]
  })

  ctx.body = result
}

async function pricing (ctx) {
  let result = await PricingRanges.findAll({
    order: ['max_price'],
    include: [{
      model: Discount,
      order: ['login'],
    }]
  })

  ctx.body = result
}

exports.register = ({router}) => {
  router.get('/fee/:authenticated', getFee)
  router.get('/discounts/:authenticated', getDiscounts)
  router.get('/pricing', pricing)
}