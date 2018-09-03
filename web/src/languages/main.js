import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en.json'
import et from './et.json'
import fi from './fi.json'

Vue.use(VueI18n)

export const messages = {
  en: en,
  et: et,
  fi: fi
}
const i18n = new VueI18n({
  locale: getLanguageFromRoute() || getLanguageFromCookies() || 'en',
  messages
})

function getLanguageFromCookies () {
  const cookie = document.cookie.split('; ')
  let parsedCookie = {}
  cookie.forEach((item) => {
    parsedCookie[item.split('=')[0]] = item.split('=')[1]
  })

  return parsedCookie['language']
}

function getLanguageFromRoute () {
  return location.pathname.split('/')[1]
}

export default i18n
