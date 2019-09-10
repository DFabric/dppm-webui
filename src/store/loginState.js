import { writable } from 'svelte/store'

import Kemal from 'kemal_jwt_auth_companion'

// TODO make dependent on envvar at compile time if possible?
const host = "http://localhost:8994/";

const kemal = Kemal(host)

const AuthCookie = () => {
  const split = document.cookie.split(';')
  const authCookie = split.find(str => str.trim().startsWith('auth='))
  return authCookie ? authCookie.split('=')[1] : ""
}
export const { authFetch } = kemal
// Returns the given number of minutes as seconds
const minutes = count => 60 * count;
// Returns the given number of hours as seconds
const hours = count => 60 * minutes(count);
// Returns the given number of days as seconds
const days = count => 24 * hours(count);

const loginState = writable(AuthCookie())

export const login = event => {
  kemal.login(null, event.detail).then(t => loginState.set(t)).catch(console.error)
}
loginState.subscribe(token => {
  document.cookie = `auth=${token};samesite=strict;secure;max-age=${days(7)}`
  return token
})

export default loginState


// Auto-login for testing obviously remove later
kemal.login(
  null,
  "wI+Z+SBIvv4h4aq8VcWeojc2W8wCistjyCmEwu4zSddF1ZUlfRyMQhoHJBPfKlq9gMVb3yHU4IY5r5MdBMuI"
)
  .then(t => loginState.set(t))
  .catch(console.error)