import Kemal from "kemal_jwt_auth_companion";
export let SessionToken;
// Returns the given number of minutes as seconds
const minutes = count => 60 * count;
// Returns the given number of hours as seconds
const hours = count => 60 * minutes(count);
// Returns the given number of days as seconds
const days = count => 24 * hours(count);
// TODO: allow overriding host from env
const host = "http://localhost:8994/";
export const { login, authFetch } = Kemal(host);
export const keepToken = token => {
  console.debug('keeping token ' + token)
  SessionToken = token;
  // for some reason putting this in a third party library just
  // doesn't work.
  document.cookie = `auth=${token};samesite=strict;secure;max-age=${days(7)}`;
  return token;
};
