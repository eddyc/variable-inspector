import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowCartIcon from "@material-ui/icons/ShowChart";
import { setSelectedVariable } from "./actions";
import LineGraph from "./LineGraph";
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
    ${"" /* box-shadow: inset 0px 0px 13px 2px #969696; */}
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
    const [selectedIndex, setSelectedIndex] = React.useState(false);
    const dispatch = useDispatch();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

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
                                    selected={selectedIndex === i}
                                    onClick={event => {
                                        handleListItemClick(event, i);
                                        dispatch(setSelectedVariable(row, e));
                                    }}
                                >
                                    <ListItemIcon>
                                        <ShowCartIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={e} />
                                </StyledListItem>
                            );
                        })}
                </List>
            </VariableListContainer>
            <VariableGraphContainer>
                <LineGraph row={row} />
            </VariableGraphContainer>
        </VariableRowContainer>
    );
};

export default VariableRow;
