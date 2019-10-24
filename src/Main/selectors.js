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

export const selectVariable = variable => {
    return createSelector(
        [selectVariables],
        variables => {
            if (typeof variables[variable] === "undefined") {
                return false;
            } else {
                return variables[variable];
            }
        }
    );
};

export const selectVariablesForGraph = selectedVariables => {
    return createSelector(
        [selectVariables],
        variables => {
            const result = {};

            selectedVariables.map(e => {
                if (typeof variables[e] !== "undefined") {
                    const variable = new Array(...variables[e]);
                    result[e] = variable.map((f, i) => ({ x: i, y: f }));
                }
                return null;
            });

            return result;
        }
    );
};
