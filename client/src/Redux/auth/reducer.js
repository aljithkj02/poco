const token = localStorage.getItem('token') || '';
const isAuth = (token) ? true : false;


const defaultData = {
    isAuth,
    token,
    loading: false
}

const authReducer = (state = defaultData, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                token: ''
            }
        case 'LOADING_ON':
            return {
                ...state,
                loading: true
            }
        case 'LOADING_OFF':
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default authReducer;