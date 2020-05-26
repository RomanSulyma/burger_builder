import React, {useEffect, useState} from "react";
import BurgerElements from "../../Components/BurgerElements/BurgerElements";
import ControlPanel from "../../Components/ControlPanel/ControlPanel";
import axios from 'axios';
import errorHandler from "../../HOC/ErrorHandler";
import Loader from "../../Components/Loader/Loader";
import * as actionCreators from '../../Redux/ActionCreators';
import {connect} from "react-redux";
import axiosInstance from "../../Axios/axiosConfig";

function BurgerBuilder(props) {

    const [availableIngridients, availableIngridientsUpdate] = useState([]);
    const [ingredientsLoaded, ingredientsLoadedUpdate] = useState(false);

    useEffect(() => {
        loadIngredients();
        if (props.burgerElements.length === 0) {
            props.fetchBurger();
        }
    },[]);

    const addIngridient = (name) => {

        const ingridientId = availableIngridients.findIndex(elem => elem.name === name);
        const ingridient = availableIngridients[ingridientId];
        const ingridientPrice = ingridient.price;

        ingridient.id = props.burgerElementId;
        props.updateBurgerElementId(props.burgerElementId + 1);

        const newBurgerElementsState = [...props.burgerElements];
        newBurgerElementsState.push(ingridient);

        props.updateBurgerElements(newBurgerElementsState);
        props.updatePriceState(props.priceState + ingridientPrice);
    };

    const removeIngridient = (id) => {

        const ingridientId = props.burgerElements.findIndex(elem => elem.id === id);
        const ingridientPrice = props.burgerElements[ingridientId].price;

        const newBurgerElementsState = [...props.burgerElements];
        newBurgerElementsState.splice(ingridientId, 1);

        props.updateBurgerElements(newBurgerElementsState);
        props.updatePriceState(props.priceState - ingridientPrice);
    };

    const loadIngredients = async () => {
        try {
            const response = await axiosInstance.get('/ingredients');
            availableIngridientsUpdate(response.data);
        } catch (e) {
            console.log('error load ingredients');
        } finally {
            ingredientsLoadedUpdate(true);
        }
    };

    let mainScreen = <Loader/>;

    if (ingredientsLoaded && props.burgerLoaded) {
        mainScreen =
            <React.Fragment>
                <BurgerElements ingridients={props.burgerElements} clicked={removeIngridient}/>
                <ControlPanel ingridients={availableIngridients} price={props.priceState} clicked={addIngridient}/>
            </React.Fragment>
    }

    return (
        <div>
            {mainScreen}
        </div>
    );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(BurgerBuilder, axios));