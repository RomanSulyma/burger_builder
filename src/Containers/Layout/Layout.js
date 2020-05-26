import React from "react";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Backdrop from "../../Components/Backdrop/Backdrop";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import axios from "axios";
import errorHandler from "../../HOC/ErrorHandler";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";

function Layout() {

    return (
        <BrowserRouter>
            <div>
                <Toolbar/>
                <Backdrop/>
                <Switch>
                    <Route path="/burger" render={() => <BurgerBuilder/>}/>
                    <Route path="/checkout" render={() => <Checkout/>}/>
                    <Route path="/orders" render={() => <Orders/>}/>
                    <Redirect from="/" to="/burger"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        burgerLoaded: state.burgerLoaded
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateBurgerLoaded: (burgerLoaded) => dispatch(actionCreators.updateBurgerLoaded(burgerLoaded))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Layout, axios));