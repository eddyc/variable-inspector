import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/configureStore";
import Main from "./Main/Main";
import "./Main/commands";
const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default App;
