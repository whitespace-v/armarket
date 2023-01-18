import {IItem} from "../models/DataBaseItems";

export const isItemInCart = (item: IItem, cart: any) => {
    for (let i in cart){
        if (cart[i].item.id === item.id){
            return true
        }
    }
}

