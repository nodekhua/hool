const axios = require('axios');

const clientCode = 395963
const username = 'kulvo'
const password = 'Volvo850'

const instance = axios.create({
  baseURL: 'https://395963.erply.com/api/'
});

let session //

const verifyApiUserURL = `?clientCode=${clientCode}&username=${username}&password=${password}&request=verifyUser`

async function fetchNewSession() {
  try {
    const { data } =  await instance.post(verifyApiUserURL)
    session = data.records[0].sessionKey
    console.log('updated session', session)
  } catch (e) {
    console.log('session update error', e)
  }
}

async function path(ctx) {
  const { request } = ctx
  console.log('proxy url', request.url.substring(11))
  const response = await proxy(`?request=${request.url.substring(11)}`)
  ctx.body = response.data
}

const proxy = (request) => instance.post(`${request}&clientCode=${clientCode}&sessionKey=${session}`)

//
// TODO: read last session from file
exports.session = () => {
  fetchNewSession()
  setInterval(() => {
    fetchNewSession()
  }, 45 * 60 * 1000)
}

exports.fetchNewSession = fetchNewSession
exports.proxy = proxy

exports.register = ({router}) => {
  router.get('/proxy/*', path)
}
