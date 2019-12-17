import net from "net";
import Vector from "./Vector";
import {
    SET_EXTERNAL_VARIABLE,
    SET_ROW_COUNT,
    DELETE_VARIABLE,
    ADD_DERIVED,
    SET_DERIVED,
    SET_WEBSOCKET_VARIABLE
} from "./types";

import { selectWSVariables } from "./selectors";

export const setWebSocketValue = (key, value) => {
    return (dispatch, getState) => {
        const store = getState();
        const wsVariables = selectWSVariables(store);

        if (typeof wsVariables[key] === "undefined") {
            const ws = new WebSocket("ws://127.0.0.1:9999", `${key}`);

            ws.onopen = () => {
                dispatch({
                    type: SET_WEBSOCKET_VARIABLE,
                    payload: { key, ws }
                });

                ws.send(value);
            };
        } else {
            const { ws } = wsVariables[key];
            ws.send(value);
        }
    };
};

export const startSocketListener = () => {
    return dispatch => {
        const server = net.createServer();

        server.on("close", function() {
            console.log("Server closed !");
        });

        let buffer = "";

        const setVariable = jsonString => {
            const result = JSON.parse(jsonString);
            result.data = new Array(...result.data);
            window[result.label] = new Vector({ ...result });
            console.log(`Received: ${result.label}`);
            dispatch({
                type: SET_EXTERNAL_VARIABLE,
                payload: window[result.label]
            });
        };
        server.on("connection", function(socket) {
            console.log("connected");
            socket.on("error", e => {
                console.log(e);
            });
            socket.on("data", function(data) {
                const dataString = `${data}`;
                const subStart = dataString.substr(0, 5);
                const subEnd = dataString.substr(dataString.length - 3, 3);

                if (
                    subStart.localeCompare("start") === 0 &&
                    subEnd.localeCompare("end") === 0
                ) {
                    const json = dataString.substr(5, dataString.length - 8);
                    setVariable(json);
                }

                if (
                    subStart.localeCompare("start") !== 0 &&
                    subEnd.localeCompare("end") === 0
                ) {
                    buffer += dataString.substr(0, dataString.length - 3);
                    setVariable(buffer);
                    buffer = "";
                }

                if (
                    subStart.localeCompare("start") === 0 &&
                    subEnd.localeCompare("end") !== 0
                ) {
                    buffer = "";
                    buffer += dataString.substr(5, dataString.length - 5);
                }

                if (
                    subStart.localeCompare("start") !== 0 &&
                    subEnd.localeCompare("end") !== 0
                ) {
                    buffer += dataString;
                }
            });

            socket.on("close", error => {
                console.log("closed");
            });
        });

        server.listen(2222);
    };
};

export const setRowCount = count => {
    return (dispatch, getState) => {
        if (count > 0) {
            dispatch({ type: SET_ROW_COUNT, payload: count });
        }
    };
};

export const deleteVariable = variable => {
    return { type: DELETE_VARIABLE, payload: variable };
};

export const addDerived = () => {
    return dispatch => {
        const label = `derived.${Date.now()}`;
        const data = "xxx-yyy";
        window[label] = new Vector({
            label,
            type: "derived",
            data: data
        });
        dispatch({
            type: ADD_DERIVED,
            payload: window[label]
        });
    };
};

export const editDerived = (label, data) => {
    return dispatch => {
        window[label] = new Vector({
            ...window[label],
            data
        });
        dispatch({
            type: SET_DERIVED,
            payload: { label, variable: window[label] }
        });
    };
};
