import {IAvailability, IBrand, ICartItem, ICategory, IItem, ISorting, ISubcategory} from "../../models/DataBaseItems";
import {AppDispatch} from "../store";
import {categorySlice} from "../slices/CategorySlice";
import {$host} from "../../hoc";

export const setCurrentCategory = (category: ICategory) => async(dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.categorySet(category))
    try {
        dispatch(categorySlice.actions.subcategoryFetching())
        const {data} = await $host.get('api/subcategory', {params: category})
        dispatch(categorySlice.actions.subcategoryFetchingSuccess(data))
    } catch (e) {
        dispatch(categorySlice.actions.subcategoryFetchingError())
    }
}
export const setCurrentPage = (page: number) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.pageSet(page))
}
export const setCurrentSorting = (sorting: ISorting) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.sortingSet(sorting))
}
export const setCurrentSubcategory = (subcategory: ISubcategory) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.subcategorySet(subcategory))
}
export const setCurrentAvailability = (availability: IAvailability) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.availabilitySet(availability))
}
export const setCurrentBrand = (brand: IBrand) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.brandSet(brand))
}
export const addToCart = (item: IItem, size: string) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.addToCart({item, size}))
}
export const deleteFromCart = (id: number) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.deleteFromCart(id))
}
export const cartItemCountControl = (item: ICartItem, count: number) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.cartItemCountControl({item, count}))
}
export const setQuery = (query: string) => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.setQuery(query))
}
export const clearFilters = () => (dispatch: AppDispatch) => {
    dispatch(categorySlice.actions.clearFilters())
}