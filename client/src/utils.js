import axios from "axios";
import { useDispatch } from "react-redux";
import config from "./config";
import { login } from './Redux/auth/action';

export const sendRefreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.get(`${config.API_URL}api/user/refresh-token`, {
            headers: {
                'authorization': `Bearer ${refreshToken}`
            }
        })
        if (res?.data?.status) {
            return {
                status: true,
                token: res.data.token
            };
        }
    } catch (err) {
        return {
            status: false,
            message: err.message
        }
    }
}