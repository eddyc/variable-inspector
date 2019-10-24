import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import styled from "styled-components";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import LineGraph from "./LineGraph";
import IconButton from "@material-ui/core/IconButton";
import { deleteVariable } from "./actions";
import { useDispatch } from "react-redux";
const VariableRowContainer = styled.div`
    grid-row: ${props => props.row + 2};
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 240px 1fr;
    width: 100%;
    grid-gap: 1px;
`;

const VariableListContainer = styled.div`
    grid-row: 1;
    grid-column: 1;
    width: 100%;
    height: 100%;
    background: white;
    overflow: scroll;
`;

const VariableGraphContainer = styled.div`
    grid-row: 1;
    grid-column: 2;
    width: 100%;
    height: 100%;
    background: white;
`;

const StyledListItem = styled(ListItem)`
    && {
    }
`;
const VariableRow = ({ row, variables }) => {
    const [selectedVariables, setSelectedVariables] = useState([]);
    const dispatch = useDispatch();
    return (
        <VariableRowContainer row={row}>
            <VariableListContainer>
                <List component="nav" aria-label="main mailbox folders">
                    {Array.isArray(variables) &&
                        variables.map((e, i) => {
                            return (
                                <StyledListItem
                                    button
                                    key={i}
                                    onClick={event => {
                                        if (selectedVariables.includes(e)) {
                                            selectedVariables.splice(
                                                selectedVariables.indexOf(e),
                                                1
                                            );
                                        } else {
                                            selectedVariables.push(e);
                                        }

                                        setSelectedVariables([
                                            ...selectedVariables
                                        ]);
                                    }}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={selectedVariables.includes(
                                                e
                                            )}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={e} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => {
                                                dispatch(deleteVariable(e));
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </StyledListItem>
                            );
                        })}
                </List>
            </VariableListContainer>
            <VariableGraphContainer>
                <LineGraph selectedVariables={selectedVariables} />
            </VariableGraphContainer>
        </VariableRowContainer>
    );
};

export default VariableRow;
