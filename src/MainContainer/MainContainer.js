import React, { useEffect } from "react";
import styled from "styled-components";
import Grapher from "../Grapher/Grapher";
import Controls from "../Controls/Controls";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { startSocketListener } from "./actions";
const MainContainerDiv = styled.div`
    flex-grow: 1;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const MainContainer = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startSocketListener());
    }, [dispatch]);

    return (
        <MainContainerDiv>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Controls" />
                    <Tab label="Variable Graphs" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Controls />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grapher />
            </TabPanel>
        </MainContainerDiv>
    );
};

export default MainContainer;
