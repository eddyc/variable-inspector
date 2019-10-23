import { createSelector } from "reselect";

export const selectVariables = ({ MainReducer }) => {
    return MainReducer.variables;
};

export const selectSelectedVariables = ({ MainReducer }) => {
    return MainReducer.selectedVariables;
};

export const selectRowcount = ({ MainReducer }) => {
    return MainReducer.rowCount;
};

export const selectVariableNames = createSelector(
    [selectVariables],
    variables => {
        return Object.keys(variables);
    }
);

export const selectSelectedVariable = row => {
    return createSelector(
        [selectSelectedVariables, selectVariables],
        (selectedVariables, variables) => {
            if (typeof selectedVariables[row] === "undefined") {
                return false;
            } else {
                return variables[selectedVariables[row]];
            }
        }
    );
};

export const selectSelectedVariableForGraph = row => {
    return createSelector(
        [selectSelectedVariable(row)],
        variable => {
            if (typeof variable === "undefined" || variable === false) {
                return false;
            } else {
                const result = new Array(...variable).map((e, i) => ({
                    x: i,
                    y: e
                }));

                return result;
            }
        }
    );
};

export const selectSelectedVariableName = row => {
    return createSelector(
        [selectSelectedVariables],
        selectedVariables => {
            if (typeof selectedVariables[row] === "undefined") {
                return false;
            } else {
                return selectedVariables[row];
            }
        }
    );
};
