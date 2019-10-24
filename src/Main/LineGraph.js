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
import { selectVariablesForGraph } from "./selectors";
const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const LineGraph = ({ selectedVariables }) => {
    const variables = useSelector(selectVariablesForGraph(selectedVariables));

    if (Object.keys(variables).length > 0) {
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
