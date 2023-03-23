import { useDispatch } from 'react-redux';
import { loadingOff, loadingOn, login, logout } from '../redux/auth/action';

export const useAction = () => {
    const dispatch = useDispatch();
    return {
        dispatch,
        login,
        logout,
        loadingOff,
        loadingOn
    }
}