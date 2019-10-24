import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/configureStore";
import Main from "./Main/Main";
import "../node_modules/react-vis/dist/style.css";

import "./Main/commands";
const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
};

export default App;
