import React, {useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import ControlPanel from "../../Components/ControlPanel/ControlPanel";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";
import {getIngredients} from "../../Axios/axiosRequests";
import errorHandler from "../../HOC/ErrorHandler";
import {withRouter} from "react-router";

const BurgerBuilder = (props) => {

    const [availableIngredients, availableIngredientsUpdate] = useState([]);
    const [ingredientsLoaded, ingredientsLoadedUpdate] = useState(false);

    useEffect(() => {
        loadIngredients();
        if (props.burgerElements.length === 0) {
            props.fetchBurger();
        }
    }, []);

    const addIngredient = (name) => {

        const ingredientId = availableIngredients.findIndex(elem => elem.name === name);
        const ingredient = availableIngredients[ingredientId];
        const ingredientPrice = ingredient.price;

        ingredient.id = props.burgerElementId;
        props.updateBurgerElementId(props.burgerElementId + 1);

        const newBurgerElementsState = [...props.burgerElements];
        newBurgerElementsState.push(ingredient);

        props.updateBurgerElements(newBurgerElementsState);
        props.updatePriceState(props.priceState + ingredientPrice);
    };

    const removeIngredient = (id) => {

        const ingredientId = props.burgerElements.findIndex(elem => elem.id === id);
        const ingredientPrice = props.burgerElements[ingredientId].price;

        const newBurgerElementsState = [...props.burgerElements];
        newBurgerElementsState.splice(ingredientId, 1);

        props.updateBurgerElements(newBurgerElementsState);
        props.updatePriceState(props.priceState - ingredientPrice);
    };

    const loadIngredients = async () => {
        try {
            const response = await getIngredients();
            availableIngredientsUpdate(response.data);
        } catch (e) {
            console.log('error load ingredients');
        } finally {
            ingredientsLoadedUpdate(true);
        }
    };

    const toCheckout = () => {
        props.history.push('/checkout');
    };

    let mainScreen = <Loader/>;

    if (ingredientsLoaded && props.burgerLoaded) {
        mainScreen =
            <React.Fragment>
                <BurgerElements ingredients={props.burgerElements} clicked={removeIngredient}/>
                <ControlPanel toCheckout={toCheckout} ingredients={availableIngredients} price={props.priceState}
                              clicked={addIngredient}/>
            </React.Fragment>
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
        burgerElements: state.burgerElements,
        priceState: state.priceState,
        burgerElementId: state.burgerElementId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePriceState: (price) => dispatch(actionCreators.updatePriceState(price)),
        updateBurgerElements: (burgerElements) => dispatch(actionCreators.updateBurgerElements(burgerElements)),
        updateBurgerElementId: (id) => dispatch(actionCreators.updateBurgerElementId(id)),
        fetchBurger: () => dispatch(actionCreators.fetchBurger())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(withRouter(BurgerBuilder)));