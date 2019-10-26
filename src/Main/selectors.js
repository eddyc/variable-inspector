import { createSelector } from "reselect";

export const selectVariables = ({ MainReducer }) => {
    return MainReducer.variables;
};

export const selectRowcount = ({ MainReducer }) => {
    return MainReducer.rowCount;
};

export const selectShowConsole = ({ MainReducer }) => {
    return MainReducer.showConsole;
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

            Array.isArray(selectedVariables) &&
                selectedVariables.map(e => {
                    if (
                        typeof variables[e] !== "undefined" &&
                        variables[e].type === "external"
                    ) {
                        const variable = Array.isArray(variables[e].data)
                            ? variables[e]
                            : new Array(...variables[e].data);
                        result[e] = variable.data.map((f, i) => ({
                            x: i,
                            y: f
                        }));
                    } else if (
                        typeof variables[e] !== "undefined" &&
                        variables[e].type === "derived"
                    ) {
                        const data = variables[e].data.replace(/\s/g, "");
                        const expr = /(\w+)(\+|\*|-|\/)(\w+)/;
                        const regexMatchAll = Array.from(data.matchAll(expr));
                        if (regexMatchAll.length !== 1) {
                            return null;
                        }
                        const regex = regexMatchAll[0];

                        const getType = s => {
                            if (
                                s === "+" ||
                                s === "*" ||
                                s === "-" ||
                                s === "/"
                            ) {
                                return "operator";
                            } else {
                                return "string";
                            }
                        };
                        const operators = {
                            "+": "add",
                            "-": "subtract",
                            "*": "multiply",
                            "/": "divide"
                        };

                        if (regex.length === 4) {
                            if (
                                getType(regex[1]) === "string" &&
                                getType(regex[2]) === "operator" &&
                                getType(regex[3]) === "string"
                            ) {
                                const v1 = variables[regex[1]];
                                const v2 = variables[regex[3]];
                                const o = v1[operators[regex[2]]];

                                if (
                                    typeof v1 === "undefined" ||
                                    typeof v2 === "undefined" ||
                                    typeof o === "undefined"
                                ) {
                                    return null;
                                }

                                const derivedResult = o(v2);
                                result[e] = derivedResult.data.map((f, i) => ({
                                    x: i,
                                    y: f
                                }));
                            }
                        }
                    }
                    return null;
                });

            return result;
        }
    );
};
