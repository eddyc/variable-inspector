import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import Knob from "react-canvas-knob";
import styled from "styled-components";
import Grapher from "../Grapher/Grapher";
import { setWebSocketValue } from "../MainContainer/actions";
const ControlsContainer = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: 1fr;
    grid-gap: 1px;
    border: 1px solid #969696;
    background: lightgrey;
`;

const KnobSection = styled.div`
    grid-row: 1;
    grid-column: 1;
    background: white;
    padding: 20px;
`;

const GrapherSection = styled.div`
    grid-row: 1;
    grid-column: 2;
    background: white;
`;

const Controls = () => {
    const [knobValue, setKnobValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const dispatch = useDispatch();
    return (
        <ControlsContainer>
            <KnobSection>
                <Knob
                    min={0}
                    max={56}
                    step={1 / 200}
                    value={knobValue}
                    fgColor="#3f51b5"
                    onChange={value => {
                        setKnobValue(value);
                        dispatch(
                            setWebSocketValue(
                                "kindex",
                                new Float64Array([value])
                            )
                        );
                        console.log(value);
                    }}
                />
                <Slider
                    value={sliderValue}
                    min={0}
                    max={1}
                    step={1 / 100}
                    onChange={(e, value) => {
                        setSliderValue(value);
                        dispatch(
                            setWebSocketValue(
                                "kxfade",
                                new Float64Array([value])
                            )
                        );
                        console.log(value);
                    }}
                />
            </KnobSection>
            <GrapherSection>
                <Grapher />
            </GrapherSection>
        </ControlsContainer>
    );
};

export default Controls;
