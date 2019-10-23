import { createStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

const middleware = [reduxThunk];

const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    window.dispatch = store.dispatch;
    window.getState = store.getState;
    return store;
};

export const store = configureStore();
