//
export function loginUser(user) {
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
}