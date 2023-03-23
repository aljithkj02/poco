export const login = (token) => (dispatch, getState) => {
    localStorage.setItem('token', token);
    return dispatch({
        type: 'LOGIN',
        payload: {
            token
        }
    })
}

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
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