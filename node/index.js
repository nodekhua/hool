const Koa = require('koa');
const http = require('http');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const app = new Koa();

router.prefix('/api')

const Erply = require('./service/erply.js')
const Auth = require('./service/auth.js')
const Cart = require('./service/cart.js')
const ShoppingCart = require('./service/shopping-cart.js')
const Products = require('./service/products')
const Order = require('./service/order.js')
const Pricing = require('./service/pricing.js')
const Pdf = require('./service/invoice.js')
const New = require('./service/news.js')

Erply.session()

app.use(cors())
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


Erply.register({router})
Auth.register({router})
Cart.register({router})
Order.register({router})
Pricing.register({router})
ShoppingCart.register({router})
Products.register({router})
Pdf.register({router})
New.register({router})

app.use(bodyParser());
app.use(router.routes());

// For docker health control
router.get('/healthz', async (ctx) => {
  ctx.body = 'all good'
});

const server = app.listen(3000);  // start

//
// need this in docker container to properly exit since node doesn't handle SIGINT/SIGTERM
// this also won't work on using npm start since:
// https://github.com/npm/npm/issues/4603
// https://github.com/npm/npm/pull/10868
// https://github.com/RisingStack/kubernetes-graceful-shutdown-example/blob/master/src/index.js
// if you want to use npm then start with `docker run --init` to help, but I still don't think it's
// a graceful shutdown of node process
//
// quit on ctrl-c when running docker in terminal
// process.on('SIGINT', function onSigint () {
// 	console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
//   shutdown();
// });
//
// // quit properly on docker stop
// process.on('SIGTERM', function onSigterm () {
//   console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
//   shutdown();
// })
//
// // shut down server
// function shutdown() {
//   server.close((err) => {
//     if (err) {
//       console.error(err);
//       process.exitCode = 1;
//     }
//     process.exit();
//   })
// }
