import { writable } from 'svelte/store'
import { notify } from './notifications'

// TODO make it configurable through a config.js file at runtime
//const host = "http://[::1]:8994/";
const host = API_BASE_URL;

const AuthCookie = () => {
  const split = document.cookie.split(';')
  const authCookie = split.find(str => str.trim().startsWith('auth='))
  return authCookie ? authCookie.split('=')[1] : ""
}
// Returns the given number of minutes as seconds
const minutes = count => 60 * count;
// Returns the given number of hours as seconds
const hours = count => 60 * minutes(count);
// Returns the given number of days as seconds
const days = count => 24 * hours(count);

const loginState = writable(AuthCookie())

export const login = event => {
  return new Promise((resolve, reject) => {
    const auth = event.detail
    fetch(host + 'sign_in', { method: 'POST', body: JSON.stringify({ user: null, auth }) })
      .then(response => response.json().catch(() => response.text().then(errors => { errors })))
      .then(({ errors, token }) => {
        if (errors && Array.isArray(errors)) {
          if (errors.length) {
            errors.forEach(error => notify({ message: error, kind: "danger" }))
            reject(errors)
          }
        } else if (errors) {
          notify({ message: errors, kind: "danger" })
          reject(errors)
        }
        return loginState.set(token)
      })
      .then(resolve)
      .catch(reject)
  })
}

let current_jwt = null

loginState.subscribe(token => {
  document.cookie = `auth=${token};samesite=strict;secure;max-age=${days(7)}`
  current_jwt = token
  return token
})

export const authFetch = (input, init) => {
  if (input.startsWith(host) || input.startsWith('/')) {
    init = init || {}
    init.headers = init.headers || {}
    init.headers["X-Token"] = current_jwt || (current_jwt = AuthCookie())
  }
  return fetch(input, init)
}

export default loginState


// Auto-login for testing obviously remove later
login({ detail: "a1BzfQuEih9dvDPGdrT0lja79kkKMoHy/H1hJSCm1epeiIE7D9yBGsCKDn95ksDORpT6C0GEG5uU1NiPy8yC" }).catch(console.error)
