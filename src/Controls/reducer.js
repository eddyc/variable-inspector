import { SET_WEBSOCKET_VARIABLE } from "./types";

const INITIAL_STATE = {
    wsVariables: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
