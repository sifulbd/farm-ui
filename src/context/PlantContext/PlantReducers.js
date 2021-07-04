export default (state, action) => {
    switch (action.type) {
        case "ADD_PLANT_REQUEST": {
            return { loading: true };
        }
        case "USER_LOGIN_SUCCESS": {
            return { loading: false, ...state, userInfo: action.payload };
        }
        case "USER_LOGIN_FAIL": {
            return { loading: false, error: action.payload };
        }

        case "USER_LOGOUT_REQUEST": {
            return { loading: true };
        }
        case "USER_LOGOUT_SUCCESS": {
            return { loading: false, userInfo: {} };
        }
        case "USER_LOGOUT_FAIL": {
            return { loading: false, error: action.payload };
        }

        case "RESET_PASSWORD_REQUEST": {
            return { loading: true };
        }
        case "RESET_PASSWORD_SUCCESS": {
            return { loading: false, resetPassword: action.payload };
        }
        case "RESET_PASSWORD_FAIL": {
            return { loading: false, error: action.payload };
        }

        case "USER_REGISTER_REQUEST": {
            return { loading: true };
        }
        case "USER_REGISTER_SUCCESS": {
            return { loading: false, successMessage: action.payload };
        }
        case "USER_REGISTER_FAIL": {
            return { loading: false, error: action.payload };
        }

        case "VALIDATE_USER_REQUEST": {
            return { loading: true };
        }
        case "VALIDATE_USER_SUCCESS": {
            return { loading: false, ...state, userValidate: action.payload };
        }
        case "VALIDATE_USER_FAIL": {
            return { loading: false, error: action.payload };
        }

        default:
            return state;
    }
};
