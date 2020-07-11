import React, {useEffect} from "react";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Backdrop from "../../Components/Backdrop/Backdrop";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import * as actionCreators from '../../Redux/ActionCreators';
import {useDispatch, useSelector} from "react-redux";
import errorHandler from "../../HOC/ErrorHandler";

const Layout = () => {

    const dispatch = useDispatch();

    const fetchValidationConstraints = () => dispatch(actionCreators.fetchValidationConstraints());
    const visibilityUpdate = () => dispatch(actionCreators.updateVisibility());
    const authorizationUpdate = (isAuthorized) => dispatch(actionCreators.authorizationUpdate(isAuthorized));
    const updateNextButtonActions = (action) => dispatch(actionCreators.updateNextButtonAction(action));
    const tokenUpdate = (token) => dispatch(actionCreators.tokenUpdate(token));

    const visibilityState = useSelector((state) => state.visibilityState);

    useEffect(() => {
        fetchValidationConstraints();
        checkAuthorization();
    }, []);

    const nextActions = {
        login: 'login',
        register: 'register',
        order: 'order',
        cancel: 'cancel'
    };

    const checkAuthorization = () => {

        const token = localStorage.getItem('token');
        const expirationTime = localStorage.getItem('expirationTime');

        if (token != null && expirationTime != null && validateExpirationTime(expirationTime)) {
            new Date(expirationTime);
            authorize(token);
        } else {
            deAuthorize();
        }
    };

    const validateExpirationTime = (expirationTime) => {
        return expirationTime > Date.now();
    };

    const authorize = (token) => {
        authorizationUpdate(true);
        tokenUpdate(`Bearer ${token}`);
    };

    const deAuthorize = () => {
        authorizationUpdate(false);
        tokenUpdate(null);
        updateNextButtonActions(nextActions.login);

        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    };

    return (
        <BrowserRouter>
            <div>
                <Toolbar/>
                <Backdrop visibilityState={visibilityState} visibilityUpdate={visibilityUpdate}/>
                <Switch>
                    <Route path="/burger" render={() => <BurgerBuilder/>}/>
                    <Route path="/checkout" render={() => <Checkout nextActions={nextActions} deAuthorize={deAuthorize}
                                                                    authorize={authorize}/>}/>
                    <Route path="/orders" render={() => <Orders/>}/>
                    <Redirect from="/" to="/burger"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default errorHandler(Layout);
