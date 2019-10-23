import React from "react";
import { useSelector } from "react-redux";
import { LineCanvas } from "@nivo/line";
import {
    selectSelectedVariable,
    selectSelectedVariableName,
    selectSelectedVariableForGraph
} from "./selectors";
import { AutoSizer } from "react-virtualized";

const LineGraph = ({ row }) => {
    const selectedVariable = useSelector(selectSelectedVariable(row));
    const selectedVariableForGraph = useSelector(
        selectSelectedVariableForGraph(row)
    );
    const selectedVariableName = useSelector(selectSelectedVariableName(row));

    const data = Array.isArray(selectedVariableForGraph)
        ? selectedVariableForGraph
        : false;
    const commonProperties = {
        margin: { top: 20, right: 20, bottom: 60, left: 80 },
        data: [{ id: selectedVariableName || "", data }],
        enablePoints: false,
        enableGridX: false
    };

    let tickValues = 0;
    const tickCount = 10;
    const elementLength = (data.length / tickCount + "").length;
    const mod = Math.pow(10, elementLength - 2);

    let min = 0,
        max = 100;
    if (data) {
        tickValues = new Array(tickCount + 1)
            .fill(0)
            .map(
                (e, i) =>
                    data.length * (i / tickCount) -
                    ((data.length * (i / tickCount)) % 100)
            );
        min = Math.min(...selectedVariable);
        max = Math.max(...selectedVariable);
    }

    return (
        <>
            {data && (
                <AutoSizer>
                    {({ height, width }) => (
                        <LineCanvas
                            height={height}
                            width={width}
                            indexBy="x"
                            axisBottom={{ tickValues }}
                            yScale={{
                                type: "linear",
                                stacked: false,
                                min,
                                max
                            }}
                            {...commonProperties}
                        />
                    )}
                </AutoSizer>
            )}
        </>
    );
};

export default LineGraph;
