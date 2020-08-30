import * as actionTypes from "./ActionTypes";
import {fetchLastBurger, fetchValidationInputs, getBurger, getOrderCustomer} from "../Axios/axiosRequests";

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

export const updateValidationConstraints = (validationConstraints) => {
    return {
        type: actionTypes.UPDATE_VALIDATION_CONSTRAINTS,
        validationConstraints: validationConstraints
    }
};

const fetchBurgerSuccess = (data) => {
    return {
        type: actionTypes.LOAD_BURGER_SUCCESS,
        burgerElements: JSON.parse(data.ingredients),
        totalPrice: data.totalPrice
    };
};

export const fetchBurgerFailed = (message) => {
    console.log('error load burger' + message);
};

export const authorizationUpdate = (isAuthorized) => {

    return {
        type: actionTypes.IS_AUTHORIZED_UPDATE,
        isAuthorized: isAuthorized
    }
};

export const tokenUpdate = (token) => {

    return {
        type: actionTypes.TOKEN_UPDATE,
        token: token
    }
};

export const updatePopupFields = (popupFields) => {
    return {
        type: actionTypes.POPUP_FIELDS_UPDATE,
        popupFields: popupFields
    }
};

export const fetchBurger = () => {
    return async (dispatch) => {
        try {
            dispatch(updateBurgerLoaded(false));
            const response = await fetchLastBurger();

            if (response.data !== '') {
                dispatch(fetchBurgerSuccess(response.data));
            }

            dispatch(updateBurgerLoaded(true));
        } catch (e) {
            fetchBurgerFailed(e.message);
        }
    }
};

export const fetchValidationConstraintsSuccess = (validationConstraints) => {
    return {
        type: actionTypes.LOAD_VALIDATION_CONSTRAINTS_SUCCESS,
        validationConstraints: validationConstraints
    };
};

const fetchValidationConstraintsFailed = (message) => {
    console.log('error load validationConstraints' + message);
};

export const fetchValidationConstraints = () => {
    return async (dispatch) => {
        try {
            const response = await fetchValidationInputs();

            if (response.data !== '') {
                dispatch(fetchValidationConstraintsSuccess(response.data));
            }
        } catch (e) {
            fetchValidationConstraintsFailed(e.message);
        }
    }
};

export const fetchAllOrders = () => {
    return async (dispatch) => {
        try {

            const response = await getBurger();

            if (response.data !== '') {
                dispatch(fetchAllOrdersSuccess(response.data));
            }

        } catch (e) {
            fetchAllOrdersFailed(e.message);
        }
    }
};

export const fetchAllOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ALL_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchAllOrdersFailed = (message) => {
    console.log('error load all orders' + message);
};

export const fetchMyOrders = (token) => {
    return async (dispatch) => {

        if (token === null) {
            dispatch(fetchMyOrdersSuccess([]));
        } else {
            try {
                const response = await getOrderCustomer(token);

                if (response.data !== '') {
                    dispatch(fetchMyOrdersSuccess(response.data));
                }
            } catch (e) {
                fetchMyOrdersFailed(e.message);
            }
        }
    }
};

export const fetchMyOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_MY_ORDERS_SUCCESS,
        orders: orders
    };
};

const fetchMyOrdersFailed = (message) => {
    console.log('error load my orders' + message);
};

export const updateNextButtonAction = (nextButtonAction) => {
    return {
        type: actionTypes.UPDATE_NEXT_BUTTON_ACTION,
        nextButtonAction: nextButtonAction
    }
};


