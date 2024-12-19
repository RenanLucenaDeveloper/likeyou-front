import { jwtDecode } from 'jwt-decode'

export const getLoginInfo = () => {
    const token = localStorage.getItem("token")
    if (token != null) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return null
    }
}