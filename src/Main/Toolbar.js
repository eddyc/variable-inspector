import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { addDerived } from "./actions";
const Container = styled.div`
    grid-row: ${props => props.rowCount + 1};
    background: white;
    padding: 5px;
`;

const Toolbar = ({ rowCount }) => {
    const dispatch = useDispatch();
    return (
        <Container rowCount={rowCount}>
            <Fab
                variant="extended"
                color="default"
                size="medium"
                onClick={() => dispatch(addDerived())}
            >
                <AddIcon fontSize="small" />
                Add Derived
            </Fab>
        </Container>
    );
};
export default Toolbar;
