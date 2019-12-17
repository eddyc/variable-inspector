import {
    SET_EXTERNAL_VARIABLE,
    DELETE_VARIABLE,
    SET_ROW_COUNT,
    ADD_DERIVED,
    SET_DERIVED,
    SET_WEBSOCKET_VARIABLE
} from "./types";

const INITIAL_STATE = {
    variables: false,
    rowCount: 1,
    wsVariables: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_WEBSOCKET_VARIABLE: {
            const { key } = action.payload;
            const { wsVariables } = state;

            if (typeof wsVariables[key] === "undefined") {
                wsVariables[key] = {
                    ...action.payload
                };
                return {
                    ...state,
                    wsVariables
                };
            } else {
                const { value } = action.payload;
                wsVariables[key].value = value;
                return {
                    ...state,
                    wsVariables
                };
            }
        }
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
        default: {
            return state;
        }
    }
};
