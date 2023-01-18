import {AppDispatch} from "../store";
import {categorySlice} from "../slices/CategorySlice";
import {$authHost, $host} from "../../hoc";
import jwt_decode from "jwt-decode";
import emailjs from "@emailjs/browser";
import {ICartItem, IToken} from "../../models/DataBaseItems";

export const signUp = (login: string, password: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.signingIn())
        const {data} = await $host.post('api/user/registration', {login, password})
        let token: IToken = jwt_decode(data.token)
        dispatch(categorySlice.actions.signIn(token.role))
        localStorage.setItem('token', data.token)
    } catch (e) {
        dispatch(categorySlice.actions.signUpError())
    }
}

export const signIn = (login: string, password: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.signingIn())
        const {data} = await $host.post('api/user/login', {login, password})
        let token: IToken = jwt_decode(data.token)
        dispatch(categorySlice.actions.signIn(token.role))
        localStorage.setItem('token', data.token)
    } catch (e) {
        dispatch(categorySlice.actions.signInError())
    }
}

export const check = () => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.signingIn())
        const {data} = await $authHost.get('api/user/auth' )
        let token: IToken = jwt_decode(data.token)
        dispatch(categorySlice.actions.signIn(token.role))
        localStorage.setItem('token', data.token)
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
export const createOrder = (data: {fio: string, number: string, address: string, index: string, city: string, cartItems: ICartItem[]}) =>
    async(dispatch: AppDispatch) => {
        dispatch(categorySlice.actions.creation())
        let goods = ''
        for (let i = 0 ; i < data.cartItems.length; i ++){
            goods = goods + data.cartItems[i].item.name + ' - ' + data.cartItems[i].size + ' Размер, ' + data.cartItems[i].count + ' шт. \n'
        }
        const order = {
            fio: data.fio, number: data.number, address: data.address, index: data.index, city: data.city, goods
        }
        try {
            await emailjs.send('service_53el6eo', 'template_29k291q', order, '7Lm4i1ZI0KrcO55HZ')
            dispatch(categorySlice.actions.creationSuccess())
        } catch (e) {
            dispatch(categorySlice.actions.creationError())
        }
    }