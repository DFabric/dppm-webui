import { post } from './transport';

import { replace } from 'svelte-spa-router';

export async function login(session, name, auth) {
  const response = await post('/sign_in', {name, auth});
  if(response.token) {
    session.update({username: name, access_token: response.token });
    return session.save();
  } else {
    throw new Error('Could not authenticate.');
  }
}

export const logout = async (session) => session.invalidate();

export const redirect = (location) => replace(location);
