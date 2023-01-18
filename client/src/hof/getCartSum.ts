import {ICartItem} from "../models/DataBaseItems";

export const getCartSum = (cartItems: ICartItem[]) => {
    let sum = 0
    for (let i in cartItems){
        sum += cartItems[i].item.price * cartItems[i].count
    }
    return sum
}