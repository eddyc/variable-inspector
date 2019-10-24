import {
    SET_VARIABLE,
    DELETE_VARIABLE,
    SET_ROW_COUNT,
    SET_SHOW_CONSOLE
} from "./types";

const INITIAL_STATE = {
    variables: false,
    rowCount: 1,
    showConsole: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_VARIABLE: {
            if (state.variables === false) {
                return {
                    ...state,
                    variables: {
                        [action.payload.label]: action.payload.data
                    }
                };
            } else {
                return {
                    ...state,
                    variables: {
                        ...state.variables,
                        [action.payload.label]: action.payload.data
                    }
                };
            }
        }
        case SET_ROW_COUNT: {
            return {
                ...state,
                rowCount: action.payload
            };
        }
        case DELETE_VARIABLE: {
            const variables = { ...state.variables };
            delete variables[action.payload];

            return {
                ...state,
                variables
            };
        }
        case SET_SHOW_CONSOLE: {
            return {
                ...state,
                showConsole: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
