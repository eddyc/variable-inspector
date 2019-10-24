import net from "net";
import Vector from "./Vector";
import {
    SET_VARIABLE,
    SET_ROW_COUNT,
    DELETE_VARIABLE,
    SET_SHOW_CONSOLE
} from "./types";
export const startVariableListener = () => {
    return dispatch => {
        const server = net.createServer();

        server.on("close", function() {
            console.log("Server closed !");
        });

        let buffer = "";

        const setVariable = jsonString => {
            const result = JSON.parse(jsonString);
            result.data = new Float64Array(result.data);
            dispatch({ type: SET_VARIABLE, payload: result });
            window[result.label] = new Vector({ ...result });
            console.log(`Received: ${result.label}`);
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

export const setShowConsole = condition => {
    return { type: SET_SHOW_CONSOLE, payload: condition };
};
