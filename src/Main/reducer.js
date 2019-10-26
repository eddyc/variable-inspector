import {
    SET_EXTERNAL_VARIABLE,
    DELETE_VARIABLE,
    SET_ROW_COUNT,
    SET_SHOW_CONSOLE,
    ADD_DERIVED,
    SET_DERIVED
} from "./types";

const INITIAL_STATE = {
    variables: false,
    rowCount: 1,
    showConsole: true
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_DERIVED: {
            return {
                ...state,
                variables: {
                    ...state.variables,
                    [action.payload.label]: action.payload.variable
                }
            };
        }
        case ADD_DERIVED:
        case SET_EXTERNAL_VARIABLE: {
            if (state.variables === false) {
                return {
                    ...state,
                    variables: {
                        [action.payload.label]: action.payload
                    }
                };
            } else {
                return {
                    ...state,
                    variables: {
                        ...state.variables,
                        [action.payload.label]: action.payload
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
