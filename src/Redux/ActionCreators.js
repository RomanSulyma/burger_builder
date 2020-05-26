import * as actionTypes from "./ActionTypes";
import axiosInstance from "../Axios/axiosConfig";

export const updateVisibility = () => {
    return {
        type: actionTypes.VISIBILITY_UPDATE
    }
};

export const updateBurgerLoaded = (burgerLoaded) => {
    return {
        type: actionTypes.BURGER_LOADED_UPDATE,
        burgerLoaded: burgerLoaded
    }
};

export const updateBurgerElements = (burgerElements) => {
    return {
        type: actionTypes.BURGER_ELEMENTS_UPDATE,
        burgerElements: burgerElements
    }
};

export const updatePriceState = (priceState) => {
    return {
        type: actionTypes.UPDATE_PRICE_STATE,
        priceState: priceState
    }
};

export const updateBurgerElementId = (burgerElementId) => {
    return {
        type: actionTypes.UPDATE_BURGER_ELEMENT_ID,
        burgerElementId: burgerElementId
    }
};

const fetchBurgerSuccess = (data) => {
    return {
        type: actionTypes.LOAD_BURGER_SUCCESS,
        burgerElements: JSON.parse(data.ingredients),
        totalPrice: data.totalPrice,
        burgerElementId: data.burgerElementId
    };
};

const fetchBurgerFailed = () => {
    console.log('error load burger');
};


export const fetchBurger = () => {
    return async (dispatch) => {
        try {
            dispatch(updateBurgerLoaded(false));
            const response = await axiosInstance.get('/burger/last');

            if (response.data !== '') {
                dispatch(fetchBurgerSuccess(response.data));
            }

            dispatch(updateBurgerLoaded(true));
        } catch (e) {
            dispatch(fetchBurgerFailed);
        }
    }
};


