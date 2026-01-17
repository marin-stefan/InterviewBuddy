export const userInitialState = {
    user: null,
};

export function UserReducer(state, action) {
    switch (action.type) {
        case "REGISTER_USER": {
            console.log("register")
            return "register";
        }
        case "SIGN_IN_USER": {
            console.log("signin")
            return "signin";
        }
        case "SIGN_OUT_USER": {
            console.log("signout")
            return "signout";
        }
        case "DELETE_USER": {
            console.log("delete")
            return "delete";
        }
        case "UPDATE_USER": {
            console.log("update")
            return "update";
        }
        default:
            return state;
    }
}
