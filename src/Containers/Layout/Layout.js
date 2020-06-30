import React, {useEffect} from "react";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Backdrop from "../../Components/Backdrop/Backdrop";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";
import errorHandler from "../../HOC/ErrorHandler";

const Layout = (props) => {

    useEffect(() => {
        props.fetchValidationConstraints();
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
        props.authorizationUpdate(true);
        props.tokenUpdate(`Bearer ${token}`);
    };

    const deAuthorize = () => {
        console.log("deathorize");
        props.authorizationUpdate(false);
        props.tokenUpdate(null);
        props.updateNextButtonActions(nextActions.login);

        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    };

    return (
        <BrowserRouter>
            <div>
                <Toolbar/>
                <Backdrop visibilityState={props.visibilityState} visibilityUpdate={props.visibilityUpdate}/>
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

const mapStateToProps = (state) => {
    return {
        burgerLoaded: state.burgerLoaded,
        visibilityState: state.visibilityState
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchValidationConstraints: () => dispatch(actionCreators.fetchValidationConstraints()),
        updateBurgerLoaded: (burgerLoaded) => dispatch(actionCreators.updateBurgerLoaded(burgerLoaded)),
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility()),
        authorizationUpdate: (isAuthorized) => dispatch(actionCreators.authorizationUpdate(isAuthorized)),
        updateNextButtonActions: (action) => dispatch(actionCreators.updateNextButtonAction(action)),
        tokenUpdate: (token) => dispatch(actionCreators.tokenUpdate(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Layout));