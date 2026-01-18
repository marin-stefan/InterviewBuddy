//

export const userInitialState = {
    loggedUser: null,
    token: null
}

export function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_USER': {
            console.log("4loginuser in reducer");
            console.log(action.payload)
            // aici setam userul in state si tokenul in state
            let newState;
            newState = {
                ...state,
                loggedUser: action.payload.user,
                token: action.payload.token
            }

            return newState;
        }

        default:
            return state;
    }
}