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
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Toolbar/>
                <Backdrop visibilityState={props.visibilityState} visibilityUpdate={props.visibilityUpdate}/>
                <Switch>
                    <Route path="/burger" render={() => <BurgerBuilder/>}/>
                    <Route path="/checkout" render={() => <Checkout/>}/>
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
        visibilityUpdate: () => dispatch(actionCreators.updateVisibility())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Layout));