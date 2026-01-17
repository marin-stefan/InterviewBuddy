export function registerUser(user) {
    return {
        type: 'REGISTER_USER',
        payload: user
    };
}

export function signInUser(user) {
  return {
    type: 'SIGN_IN_USER',
    payload: user,
  };
}

export function signOutUser(userId) {
  return {
    type: 'SIGN_OUT_USER',
    payload: userId,
  };
}

export function deleteUser(userId) {
  return {
    type: 'DELETE_USER',
    payload: userId,
  };
}

export function updateUser(user) {
  return {
    type: 'UPDATE_USER',
    payload: user,
  };
}