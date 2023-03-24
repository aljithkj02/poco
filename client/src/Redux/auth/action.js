export const login = (token, refreshToken) => (dispatch, getState) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return dispatch({
        type: 'LOGIN',
        payload: {
            token
        }
    })
}

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return dispatch({
        type: 'LOGOUT'
    })
}

export const loadingOn = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_ON'
    })
}

export const loadingOff = () => (dispatch, getState) => {
    return dispatch({
        type: 'LOADING_OFF'
    })
}