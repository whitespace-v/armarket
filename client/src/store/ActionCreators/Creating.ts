import {AppDispatch} from "../store";
import {IAvailability, IBrand, ICategory, ICurrentItem, IItem, ISubcategory} from "../../models/DataBaseItems";
import {categorySlice} from "../slices/CategorySlice";
import {$authHost, $host} from "../../hoc";

export const createCategory = (name: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $authHost.post('api/category', {name})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
export const createBrand = (name: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $authHost.post('api/brand', {name})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
export const createItem =
    (name: string, description: string, price: string, compressedImages: File[],
     currentAvailability: IAvailability, currentBrand: IBrand, currentCategory: ICategory,
     currentSubcategory: ISubcategory) => async(dispatch: AppDispatch) => {
        const item = new FormData()
        item.append('name', `${name} ${currentBrand.name}`)
        item.append('description', description)
        item.append('price', price)
        item.append('currentAvailability', String(currentAvailability.name))
        item.append('currentBrand', String(currentBrand.id))
        item.append('currentCategory', String(currentCategory.id))
        item.append('currentSubcategory', String(currentSubcategory.id))
        Array.from(compressedImages).forEach(i => {
            item.append('images', i);
        });
        try {
            dispatch(categorySlice.actions.creation())
            await $authHost.post('api/item', item)
            dispatch(categorySlice.actions.creationSuccess())
        } catch (e) {
            dispatch(categorySlice.actions.creationError())
        }
    }

export const createSubcategory = (name: string, category: ICategory) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $authHost.post('api/subcategory', {name, category})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}

export const createAvailability = (name: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $authHost.post('api/availability', {name})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
export const commentCreate = (item: IItem, comment: string, mark: number ) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $host.post('api/comment', {item, comment, mark})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}

export const deleteItem = (id: number) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $authHost({method:'DELETE', url:`api/item/${id}`});
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
export const addSize = (id: string, size: string) => async(dispatch: AppDispatch) => {
    try {
        dispatch(categorySlice.actions.creation())
        await $host.post('api/size', {id, size})
        dispatch(categorySlice.actions.creationSuccess())
    } catch (e) {
        dispatch(categorySlice.actions.creationError())
    }
}
