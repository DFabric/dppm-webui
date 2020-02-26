import { post } from './transport';

import { replace } from 'svelte-spa-router';

export async function login(session, user, auth) {
  const response = await post('api/sign_in', {user, auth});
  if(response.token) {
    session.update({username: user, access_token: response.token });
    return session.save();
  } else {
    throw new Error('Could not authenticate.');
  }
}

export const logout = async (session) => session.invalidate();

export const redirect = (location) => replace(location);
