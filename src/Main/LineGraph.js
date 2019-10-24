import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    LineSeriesCanvas
} from "react-vis";
import { AutoSizer } from "react-virtualized";
import styled from "styled-components";
import Vector from "./Vector";
import { selectVariablesForGraph } from "./selectors";
import { SET_VARIABLE } from "./types";
const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const LineGraph = ({ selectedVariables }) => {
    useEffect(() => {
        const var1 = new Vector({ data: [1, 2, 4], label: "var1" });
        window["var1"] = var1;
        window.dispatch({ type: SET_VARIABLE, payload: var1 });
        const var2 = new Vector({ data: [4, 5, 1], label: "var2" });
        window["var2"] = var2;
        window.dispatch({ type: SET_VARIABLE, payload: var2 });
    }, []);

    const data = [];

    const variables = useSelector(selectVariablesForGraph(selectedVariables));
    console.log(variables);

    if (data !== false) {
        return (
            <Container>
                <AutoSizer>
                    {({ height, width }) => {
                        return (
                            <XYPlot
                                height={height}
                                width={width}
                                margin={{ left: 50 }}
                            >
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis />
                                {Object.keys(variables).map((e, i) => {
                                    return (
                                        <LineSeriesCanvas
                                            key={i}
                                            data={variables[e]}
                                        />
                                    );
                                })}
                            </XYPlot>
                        );
                    }}
                </AutoSizer>
            </Container>
        );
    } else {
        return null;
    }
};

export default LineGraph;
