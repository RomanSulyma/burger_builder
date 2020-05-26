import * as actionTypes from './ActionTypes';

const initialState = {
    burgerElements: [],
    priceState: 0,
    burgerElementId: 0,
    visibilityState: false,
    burgerLoaded: false
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
        default :
            return state;
    }
};

export default reducer;