import React, {useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import Popup from "../../Components/Popup/Popup";
import CheckoutPanel from "../../Components/CheckoutPanel/CheckoutPanel";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";
import {buyBurger, signIn, signUp} from "../../Axios/axiosRequests";
import errorHandler from "../../HOC/ErrorHandler";
import {withRouter} from "react-router";

const Checkout = (props) => {

    const popupFields = {
        order: "order",
        login: "login",
        register: "register"
    };

    const [enabledState, enabledStateUpdate] = useState(false);
    const [errorState, errorStateUpdate] = useState(null);

    useEffect(() => {
        if (props.burgerElements.length === 0) {
            props.fetchBurger();
        }
    }, []);

    const saveToLocalStorage = (token, expirationTime) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);
    };

    const confirmBuy = async () => {
        let burgerForm = new Map();

        props.validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.order)
            .forEach(constraint => {
                burgerForm.set(constraint.placeholder, constraint.value);
            });

        burgerForm.set('ingredients', JSON.stringify(props.burgerElements));
        burgerForm.set('totalPrice', props.priceState);
        burgerForm.set('burgerElementId', props.burgerElementId);

        await buyBurger(props.token, Object.fromEntries(burgerForm));
        props.visibilityUpdate();
    };

    const login = async () => {
        let signInForm = new Map();

        props.validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.login)
            .forEach(constraint => signInForm.set(constraint.placeholder, constraint.value));

        const data = await signIn(Object.fromEntries(signInForm));

        if (data.status === 401) {
            errorStateUpdate('Bad credentials');
        } else {
            const token = data.data.token;
            const tokenExpirationTime = new Date(...data.data.expirationTime).getTime();

            if (token !== null) {
                props.authorize(token);
                props.visibilityUpdate();

                errorStateUpdate(null);

                const expirationTimeMills = tokenExpirationTime - Date.now();
                console.log(expirationTimeMills);

                setTimeout(() => props.deAuthorize, expirationTimeMills);

                saveToLocalStorage(token, tokenExpirationTime);
            }
            enabledStateUpdate(false);
        }
    };

    const register = async () => {
        let signUpForm = new Map();

        props.validationConstraints
            .filter(constraint => constraint.fieldType === popupFields.register)
            .forEach(constraint => signUpForm.set(constraint.placeholder, constraint.value));

        const data = await signUp(Object.fromEntries(signUpForm));

        if (data.status !== 200) {
            errorStateUpdate(data.data.responseMessage);
        } else {
            const token = data.data.token;
            const tokenExpirationTime = new Date(...data.data.expirationTime).getTime();

            if (token !== null) {
                props.authorize(token);
                props.visibilityUpdate();

                errorStateUpdate(null);

                const expirationTimeMills = tokenExpirationTime - Date.now();
                console.log(expirationTimeMills);

                setTimeout(() => props.deAuthorize, expirationTimeMills);

                saveToLocalStorage(token, tokenExpirationTime);
            }
            enabledStateUpdate(false);
        }
    };

    const toBurgerBuilder = () => {
        props.history.push('/burger');
    };

    const nextAction = () => {
        switch (props.nextButtonAction) {
            case props.nextActions.login :
                props.updatePopupFields(popupFields.login);
                return login;
            case props.nextActions.register :
                props.updatePopupFields(popupFields.register);
                return register;
            case props.nextActions.order :
                props.updatePopupFields(popupFields.order);
                return confirmBuy;
        }
    };

    let mainScreen = <Loader/>;

    if (props.burgerLoaded) {
        mainScreen = (
            <React.Fragment>
                <Popup visibilityState={props.visibilityState} popupFields={props.popupFields}
                       validationConstraints={props.validationConstraints}
                       updateValidationConstraints={props.updateValidationConstraints}
                       visibilityUpdate={props.visibilityUpdate} enabledState={enabledState}
                       enabledStateUpdate={enabledStateUpdate} error={errorState} confirm={nextAction()}/>
                <BurgerElements ingredients={props.burgerElements} clicked={() => {
                }}/>
                <CheckoutPanel burgerElements={props.burgerElements} isAuthorized={props.isAuthorized}
                               validationConstraints={props.validationConstraints}
                               visibilityUpdate={props.visibilityUpdate}
                               updateNextButtonActions={props.updateNextButtonActions}
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

const mapStateToProps = (state) => {
    return {
        burgerLoaded: state.burgerLoaded,
        visibilityState: state.visibilityState,
        burgerElements: state.burgerElements,
        priceState: state.priceState,
        burgerElementId: state.burgerElementId,
        isAuthorized: state.isAuthorized,
        validationConstraints: state.validationConstraints,
        nextButtonAction: state.nextButtonAction,
        token: state.token,
        popupFields: state.popupFields
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility()),
        fetchBurger: () => dispatch(actionCreators.fetchBurger()),
        authorizationUpdate: (isAuthorized) => dispatch(actionCreators.authorizationUpdate(isAuthorized)),
        tokenUpdate: (token) => dispatch(actionCreators.tokenUpdate(token)),
        updatePopupFields: (popupFields) => dispatch(actionCreators.updatePopupFields(popupFields)),
        updateNextButtonActions: (action) => dispatch(actionCreators.updateNextButtonAction(action)),
        updateValidationConstraints: (validationConstraints) => dispatch(actionCreators.updateValidationConstraints(validationConstraints))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(withRouter(Checkout)));