const { New } = require('../models')

async function getNews (ctx) {
  const { authenticated } = ctx.params
  let result = await New.findAll({
      attributes: ['id', 'ndate', 'introtext', 'image']
  });

  ctx.body = result
}

async function getNewId (ctx) {
    const { authenticated } = ctx.params
    let result = await New.findById(ctx.params.id);

    ctx.body = result
}


exports.register = ({router}) => {
  router.get('/news/:id', getNewId)
  router.get('/news', getNews)
}