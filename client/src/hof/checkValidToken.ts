import jwt_decode from "jwt-decode";

export const checkValidToken = () => {
    let isExpired = false;
    const token: any = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token);
    const dateNow = new Date();

    if (decodedToken.exp < dateNow.getTime()){
        isExpired = true;
    }

    return isExpired;
}