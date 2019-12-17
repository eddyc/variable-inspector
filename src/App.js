import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/configureStore";
import MainContainer from "./MainContainer/MainContainer";
import "../node_modules/react-vis/dist/style.css";

const App = () => {
    return (
        <Provider store={store}>
            <MainContainer />
        </Provider>
    );
};

export default App;
