import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startVariableListener } from "./actions";
import {
    selectVariableNames,
    selectRowcount,
    selectShowConsole
} from "./selectors";
import styled from "styled-components";
import VariableRow from "./VariableRow";
import Toolbar from "./Toolbar";
const MainContainer = styled.div`
    width: 100%;
    height: calc(100vh - 2px);
    background: #969696;
    display: grid;
    grid-template-rows: ${props =>
            new Array(props.rowCount).fill("1fr").join(" ")} 50px;
    grid-template-columns: 1fr;
    grid-gap: 1px;
    border: 1px solid #969696;
`;

const VariableListener = props => {
    const dispatch = useDispatch();
    const variableNames = useSelector(selectVariableNames);
    const rowCount = useSelector(selectRowcount);
    useEffect(() => {
        dispatch(startVariableListener());
    }, [dispatch]);
    return (
        <MainContainer rowCount={rowCount}>
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
        </MainContainer>
    );
};

export default VariableListener;
