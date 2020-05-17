import React, {useState} from "react";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
import Backdrop from "../../Components/Backdrop/Backdrop";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {Redirect, Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Checkout from "../Checkout/Checkout";
import Orders from "../Orders/Orders";
import Context from "../../Components/Context/Context"
import axios from "axios";
import errorHandler from "../../HOC/ErrorHandler";

function Layout() {

    const [visibilityState, visibilityStateUpdate] = useState(false);
    const [burgerElementsState, burgerElementsStateUpdate] = useState([]);
    const [priceState, priceStateUpdate] = useState(0);
    const [burgerElementId, burgerElementIdUpdate] = useState(0);
    const [burgerLoaded, burgerLoadedUpdate] = useState(false);

    const backdropStateToogle = () => {
        visibilityStateUpdate(!visibilityState);
    };

    const changeBurgerElements = (newBurgerElementsState) => {
        burgerElementsStateUpdate(newBurgerElementsState);
    };

    const loadBurger = async () => {
        try {
            burgerLoadedUpdate(false);
            const response = await axios.get('http://localhost:8080' + '/burger/last');

            console.log(response.data);
            if(response.data !== '') {
                burgerElementsStateUpdate(JSON.parse(response.data.ingredients));
                priceStateUpdate(response.data.totalPrice);
                burgerElementIdUpdate(response.data.burgerElementId);
            }
        } catch (e) {
            console.log('error load burger');
        } finally {
            burgerLoadedUpdate(true);
        }
    };

    return (
        <Context.Provider value={{
            burgerElements : burgerElementsState,
            changeBurgerElements : (newBurgerElementsState) => changeBurgerElements(newBurgerElementsState),
            loadBurger : () => loadBurger(),
            priceState : priceState,
            priceStateUpdate : (newPriceState) => priceStateUpdate(newPriceState),
            burgerElementId : burgerElementId,
            burgerElementIdUpdate : (newBurgerElementIdState) => burgerElementIdUpdate(newBurgerElementIdState),
            visibilityState : visibilityState,
            visibilityUpdate : () => backdropStateToogle(),
            burgerLoaded : burgerLoaded
        }}>
        <BrowserRouter>
            <div>
                <Toolbar/>
                <Backdrop/>
                <Switch>
                    <Route path="/burger" render={() => <BurgerBuilder/>}/>
                    <Route path="/checkout" render={() => <Checkout/>} />
                    <Route path="/orders" render={() => <Orders/>}/>
                    <Redirect from="/" to="/burger"/>
                </Switch>
            </div>
        </BrowserRouter>
        </Context.Provider>
    );
}

export default errorHandler(Layout, axios);