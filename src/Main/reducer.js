import { SET_VARIABLE, SET_SELECTED_VARIABLE, SET_ROW_COUNT } from "./types";

const INITIAL_STATE = {
    variables: false,
    selectedVariables: {},
    rowCount: 1
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
        case SET_SELECTED_VARIABLE: {
            return {
                ...state,
                selectedVariables: {
                    ...state.selectedVariables,
                    [action.payload.row]: action.payload.variable
                }
            };
        }
        case SET_ROW_COUNT: {
            return {
                ...state,
                rowCount: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
