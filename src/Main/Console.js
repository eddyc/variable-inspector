import React, { useEffect, useState } from "react";
import { Hook, Console, Decode } from "console-feed";
import styled from "styled-components";
const Container = styled.div`
    grid-row: ${props => props.rowCount + 2};
`;

const ConsoleContainer = ({ rowCount }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        Hook(window.console, log => {
            setLogs(logs => [...logs, Decode(log)]);
        });

        console.log(`Hello world!`);
    }, []);

    return (
        <Container rowCount={rowCount}>
            <Console logs={logs} variant="dark" />
        </Container>
    );
};
export default ConsoleContainer;
