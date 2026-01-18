//
export function loginUser(user) {
  console.log("3actionloginuser")
  return {
    type: 'LOGIN_USER',
    payload: user,
  };
}