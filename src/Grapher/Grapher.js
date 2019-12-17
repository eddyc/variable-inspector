import React from "react";
import { useSelector } from "react-redux";
import {
    selectVariableNames,
    selectRowcount
} from "../MainContainer/selectors";
import styled from "styled-components";
import VariableRow from "./VariableRow";
import Toolbar from "./Toolbar";
const GrapherContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    background: #969696;
    display: grid;
    grid-template-rows: ${props =>
            new Array(props.rowCount).fill("1fr").join(" ")} 50px;
    grid-template-columns: 1fr;
    grid-gap: 1px;
    border: 1px solid #969696;
`;

const Grapher = () => {
    const variableNames = useSelector(selectVariableNames);
    const rowCount = useSelector(selectRowcount);
    return (
        <GrapherContainer rowCount={rowCount}>
            {rowCount > 0 &&
                new Array(rowCount).fill(0).map((e, i) => {
                    return (
                        <VariableRow
                            key={i}
                            row={i}
                            variables={variableNames}
                        />
                    );
                })}
            <Toolbar rowCount={rowCount} />
        </GrapherContainer>
    );
};

export default Grapher;
