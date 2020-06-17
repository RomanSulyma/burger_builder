import React from 'react';
import './css/grid.css';
import './App.css';
import Layout from "./Containers/Layout/Layout";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import reducer from "./Redux/reducer";
import thunk from 'redux-thunk'

const App = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

    return (
        <Provider store={store}>
            <div className="App">
                <Layout/>
            </div>
        </Provider>
    );
};

export default App;
