import * as actionTypes from './ActionTypes';

const initialState = {
    burgerElements: [],
    priceState: 0,
    burgerElementId: 0,
    visibilityState: false,
    burgerLoaded: false,
    validationConstraints: [],
    isAuthorized: false,
    token: null,
    popupFields: "login",
    orders: [],
    nextButtonAction: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.BURGER_LOADED_UPDATE :
            return {
                ...state,
                burgerLoaded: action.burgerLoaded
            };
        case actionTypes.VISIBILITY_UPDATE :
            return {
                ...state,
                visibilityState: !state.visibilityState
            };
        case actionTypes.BURGER_ELEMENTS_UPDATE :
            return {
                ...state,
                burgerElements: action.burgerElements
            };
        case actionTypes.UPDATE_PRICE_STATE :
            return {
                ...state,
                priceState: action.priceState
            };
        case actionTypes.UPDATE_BURGER_ELEMENT_ID :
            return {
                ...state,
                burgerElementId: action.burgerElementId
            };
        case actionTypes.LOAD_BURGER_SUCCESS :
            return {
                ...state,
                burgerElements: action.burgerElements,
                priceState: action.totalPrice,
                burgerElementId: action.burgerElementId
            };
        case actionTypes.LOAD_VALIDATION_CONSTRAINTS_SUCCESS :

            action.validationConstraints.forEach(value => {
                value.isValid = false;
                value.isTouched = false;
            });

            return {
                ...state,
                validationConstraints: action.validationConstraints
            };
        case actionTypes.UPDATE_VALIDATION_CONSTRAINTS :
            return {
                ...state,
                validationConstraints: action.validationConstraints
            };
        case actionTypes.IS_AUTHORIZED_UPDATE :
            return {
                ...state,
                isAuthorized: action.isAuthorized
            };
        case actionTypes.TOKEN_UPDATE :
            return {
                ...state,
                token: action.token
            };
        case actionTypes.POPUP_FIELDS_UPDATE :
            return {
                ...state,
                popupFields: action.popupFields
            };
        case actionTypes.FETCH_ALL_ORDERS_SUCCESS :
            return {
                ...state,
                orders: action.orders
            };
        case actionTypes.FETCH_MY_ORDERS_SUCCESS :
            return {
                ...state,
                orders: action.orders
            };
        case actionTypes.UPDATE_NEXT_BUTTON_ACTION :
            return {
                ...state,
                nextButtonAction: action.nextButtonAction
            };
        default :
            return state;
    }
};

export default reducer;