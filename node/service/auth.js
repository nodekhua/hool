const Erply = require('./erply.js')
const { User } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const emailHelper = require('../helper/email');
const messages = require('../languages/main');

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds

async function path(ctx) {
  ctx.body = 'auth'
}

async function authenticate(ctx) {
  const { email, password } = ctx.request.body
  let today = new Date()
  const language = ctx.request.body.language

  const resUser = await User
    .findOne({
        where: {
          email: email
        },
    })
  if (!resUser) {
    ctx.body = {message: messages[language]['Wrong email or password'], statusText: 'error'}
    return
  }
  let token = generateToken()
  resUser.update({
    token: token,
    token_expires: new Date(today.getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 19).replace('T', ' ')
  }).then(() => {})

  if (!bcrypt.compareSync(password, resUser.password)) {
    ctx.body = {message: messages[language]['Wrong email or password'], statusText: 'error'}
  } else {
    ctx.body = {user: JSON.stringify(resUser), statusText: 'success'}
  }
}

async function authenticateByToken(ctx) { 
  const { token } = ctx.request.body
  const today = new Date()
  const resUser = await User
    .findOne({
        where: {
          token: token
        },
    })

  if (!resUser) {
    ctx.body = {}
  } else {
    ctx.body = resUser
  }
}

async function registration(ctx) {
  const { email, first_name, last_name, company_name, password, vat_number, language } = ctx.request.body
  const hash = bcrypt.hashSync(password, 10)
  const isset_users = await User.findAll({
    where: {
      email: email
    }
  })

  if(isset_users.length > 0) {
    ctx.body = {message: messages[language]['The user was already registered with this email'], statusText: 'error'}
  }
  if (!validateDataLength(email, first_name, last_name, company_name, password, vat_number)) {
    ctx.body = {message: [language]['Max length of each field 50 characters'], statusText: 'error'}
  }
  if (!validateEmail(email)) {
    ctx.body = {message: [language]['Email not valid'], statusText: 'error'}
  }
  try {
    const url = `?request=saveCustomer&firstName=${encodeURI(first_name)}&lastName=${encodeURI(last_name)}&email=${encodeURI(email)}&password=${encodeURI(hash)}&companyName=${encodeURI(company_name)}&vatNumber=${encodeURI(vat_number)}`
    const { data } = await Erply.proxy(url)
  } catch (e) { 
    console.log(e)
  }

  const result = await User.upsert({
    email: email,
    first_name: first_name,
    last_name: last_name,
    company_name: company_name,
    password: hash,
    vat_number: vat_number,
  })

  ctx.body = {message: [language]['Email not valid'], statusText: 'success'}
}

async function reset(ctx) {
  const { email } = ctx.request.body
  const language = ctx.request.body.language
  const resUser = await User
    .findOne({
        where: {
          email: email
        },
    })
  if (!resUser) {
    ctx.body = {message: messages[language]['User was not found'], statusText: 'error'}
    return
  }
  const reset_password_token = "" + new Date().valueOf().toString() + resUser.id
  const user = await resUser.update({
    reset_password_token: parseInt(reset_password_token)
  })
  let html = '<p>' + messages[language]['Dear Customer! To reset password please follow this link'] + " " + ctx.request.header.origin + '/' + language + '/password_reset/' + reset_password_token + ' </p>'
  html += '<br><br><p>' + messages[language]['With best regards,'] + '</p>'
  html += '<p>' + messages[language]['Hool.ee team'] + '</p>'
  const mailOptions = {
    from: process.env.NODEMAILER_SENDER_EMAIL,
    to: resUser.email,
    subject: messages[language]['Hool reset password'],
    html: html
  };
  const result = await emailHelper.send(mailOptions)

  ctx.body = {statusText: 'success'}
}

async function new_password (ctx) { 
  const language = ctx.request.body.language
  const resUser = await User
    .findOne({
        where: {
          reset_password_token: ctx.request.body.token
        },
    })
  if (!resUser) {
    ctx.body = {message:messages[language]['Not authorized'], statusText: "error"}
    return
  }
  const result = await resUser.update({
    password: bcrypt.hashSync(ctx.request.body.password, 10)
  })

  if (result.id) {
    ctx.body = {statusText: "success"}
    return
  }
}

async function customers(ctx) { 
  const { customerID } = ctx.params.id; 
  const { data } = await Erply.proxy(`?request=getCustomers&recordsInResponse=100`)

  ctx.body = data;
}

exports.register = ({router}) => {
  router.get('/auth', path)
  router.post('/authenticate', authenticate)
  router.post('/authenticate_by_token', authenticateByToken)
  router.post('/registration', registration)
  router.post('/reset', reset)
  router.post('/new_password', new_password)
  // router.get('/customers/:id', customers)
}

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email);
}
function validateDataLength(email, first_name, last_name, company_name, password, vat_number) {
  if (email.length > 50 ||
    first_name.length > 50 ||
    last_name.length > 50 ||
    company_name.length > 50 ||
    password.length > 50 ||
    vat_number.length > 50) {
      return false
    }
  return true
}
function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}