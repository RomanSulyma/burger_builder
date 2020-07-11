import React, {useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import Popup from "../../Components/Popup/Popup";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {useDispatch, useSelector} from "react-redux";
import {buyBurger, signIn, signUp} from "../../Axios/axiosRequests";
import errorHandler from "../../HOC/ErrorHandler";
import {withRouter} from "react-router";

const Checkout = (props) => {

    const popupFields = {
        order: "order",
        login: "login",
        register: "register"
    };

    const [enabledState, enabledStateUpdate] = useState(true);
    const [errorState, errorStateUpdate] = useState(null);

    const dispatch = useDispatch();

    const visibilityUpdate = () => dispatch(actionCreators.updateVisibility());
    const fetchBurger = () => dispatch(actionCreators.fetchBurger());
    const updatePopupFields = (popupFields) => dispatch(actionCreators.updatePopupFields(popupFields));
    const updateNextButtonActions = (action) => dispatch(actionCreators.updateNextButtonAction(action));
    const updateValidationConstraints = (validationConstraints) => dispatch(actionCreators.updateValidationConstraints(validationConstraints));

    const burgerLoaded = useSelector((state) => state.burgerLoaded);
    const visibilityState = useSelector((state) => state.visibilityState);
    const burgerElements = useSelector((state) => state.burgerElements);
    const priceState = useSelector((state) => state.priceState);
    const isAuthorized = useSelector((state) => state.isAuthorized);
    const validationConstraints = useSelector((state) => state.validationConstraints);
    const nextButtonAction = useSelector((state) => state.nextButtonAction);
    const token = useSelector((state) => state.token);
    const currentPopupField = useSelector((state) => state.popupFields);

    useEffect(() => {
        if (!burgerLoaded) {
            fetchBurger();
        }
    }, []);

    const saveToLocalStorage = (token, expirationTime) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
    };

    const confirmBuy = async () => {
        let burgerForm = new Map();

        validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.order)
            .forEach(constraint => {
                burgerForm.set(constraint.placeholder, constraint.value);
            });

        burgerForm.set('ingredients', JSON.stringify(burgerElements));
        burgerForm.set('totalPrice', priceState);

        await buyBurger(token, Object.fromEntries(burgerForm));
        visibilityUpdate();
    };

    const login = async () => {
        let signInForm = new Map();

        validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.login)
            .forEach(constraint => signInForm.set(constraint.placeholder, constraint.value));

        const data = await signIn(Object.fromEntries(signInForm));

        if (data.status === 401) {
            errorStateUpdate('Bad credentials');
        } else {
            const token = data.data.token;
            const tokenExpirationTime = new Date(data.data.expirationTime).getTime();

            if (token !== null) {
                props.authorize(token);
                visibilityUpdate();

                errorStateUpdate(null);

                const expirationTimeMills = tokenExpirationTime - Date.now();
                console.log(expirationTimeMills);

                setTimeout(() => props.deAuthorize(), expirationTimeMills);

                saveToLocalStorage(token, tokenExpirationTime);
            }
            enabledStateUpdate(false);
        }
    };

    const register = async () => {
        let signUpForm = new Map();

        validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.register)
            .forEach(constraint => signUpForm.set(constraint.placeholder, constraint.value));

        const data = await signUp(Object.fromEntries(signUpForm));

        if (data.status !== 200) {
            errorStateUpdate(data.data.responseMessage);
        } else {
            const token = data.data.token;
            const tokenExpirationTime = new Date(data.data.expirationTime).getTime();

            if (token !== null) {
                props.authorize(token);
                visibilityUpdate();

                errorStateUpdate(null);

                const expirationTimeMills = tokenExpirationTime - Date.now();
                console.log(expirationTimeMills);

                setTimeout(() => props.deAuthorize(), expirationTimeMills);

                saveToLocalStorage(token, tokenExpirationTime);
            }
            enabledStateUpdate(false);
        }
    };

    const toBurgerBuilder = () => {
        props.history.push('/burger');
    };

    const nextAction = () => {
        switch (nextButtonAction) {
            case props.nextActions.login :
                updatePopupFields(popupFields.login);
                return login;
            case props.nextActions.register :
                updatePopupFields(popupFields.register);
                return register;
            case props.nextActions.order :
                updatePopupFields(popupFields.order);
                return confirmBuy;
            default :
                updatePopupFields(popupFields.login);
                return login;
        }
    };

    let mainScreen = <Loader/>;

    if (burgerLoaded) {
        mainScreen = (
            <React.Fragment>
                <Popup visibilityState={visibilityState} popupFields={currentPopupField}
                       validationConstraints={validationConstraints}
                       updateValidationConstraints={updateValidationConstraints}
                       visibilityUpdate={visibilityUpdate} enabledState={enabledState}
                       enabledStateUpdate={enabledStateUpdate} error={errorState} confirm={nextAction()}/>
                <BurgerElements ingredients={burgerElements} clicked={() => {}}/>
                <CheckoutPanel burgerElements={burgerElements} isAuthorized={isAuthorized}
                               validationConstraints={validationConstraints}
                               visibilityUpdate={visibilityUpdate}
                               updateNextButtonActions={updateNextButtonActions}
                               toBurgerBuilder={toBurgerBuilder} nextActions={props.nextActions}/>
            </React.Fragment>
        );
    }

    return (
        <div>
            {mainScreen}
        </div>
    );
};

export default errorHandler(withRouter(Checkout));
