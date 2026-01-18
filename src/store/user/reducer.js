//

export const userInitialState = {
    loggedUser: null,
    token: null
}

export function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_USER': {
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