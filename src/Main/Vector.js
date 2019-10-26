import { SET_EXTERNAL_VARIABLE } from "./types";

export default class Vector {
    constructor({
        data = [],
        label = "",
        texLabel = `\\text{${label}}`,
        type = "external"
    }) {
        this.data = data;
        this.label = label;
        this.texLabel = texLabel;
        this.type = type;
    }

    print = () => {
        console.log("printing");
    };

    negate = () => {
        return singleVectorMap(
            this,
            e => -e,
            `-${this.label}`,
            `-\\text{${this.label}}`
        );
    };

    sum = () => {
        return singleVectorReduce(
            this,
            (acc, curr) => (acc += curr),
            `sum(${this.label})`,
            `\\sum{\\text{${this.label}}}`
        );
    };
    subtract = input => {
        if (typeof input === "number") {
            return singleVectorMap(
                this,
                a => a - input,
                `${this.label}-${input}`
            );
        } else if (typeof input === "object") {
            return vectorVectorMap(this, input, (a, b) => a - b, "-");
        }
    };
    multiply = input => {
        if (typeof input === "number") {
            return singleVectorMap(
                this,
                a => a * input,
                `${this.label}*${input}`
            );
        } else if (typeof input === "object") {
            return vectorVectorMap(this, input, (a, b) => a * b, "*");
        }
    };
    add = input => {
        if (typeof input === "number") {
            return singleVectorMap(
                this,
                a => a + input,
                `${this.label}+${input}`
            );
        } else if (typeof input === "object") {
            return vectorVectorMap(this, input, (a, b) => a + b, "+");
        }
    };
    set = () => {
        window[this.label] = new Vector({ ...this });
        window.dispatch({
            type: SET_EXTERNAL_VARIABLE,
            payload: window[this.label]
        });
        return;
    };
}

const singleVectorMap = (input, operation, label = "", texLabel = "") => {
    return new Vector({
        data: input.data.map(e => {
            return operation(e);
        }),
        label,
        texLabel
    });
};

const singleVectorReduce = (input, operation, label = "", texLabel = "") => {
    return new Vector({
        data: [
            input.data.reduce((acc, curr) => {
                return operation(acc, curr);
            }, 0)
        ],
        label,
        texLabel
    });
};

const vectorVectorMap = (
    inputA,
    inputB,
    operation,
    label = "",
    texLabel = ""
) => {
    const dataA = inputA.data;
    const dataB = inputB.data;
    if (dataA.length !== dataB.length) {
        console.error("Vector sizes incompatible");
        return;
    }

    return new Vector({
        data: dataA.map((e, i) => {
            return operation(e, dataB[i]);
        }),
        label: `${inputA.label}${label}${inputB.label}`,
        texLabel: `\\text{${inputA.label}}${label}\\text{${inputB.label}}`
    });
};

window.Vector = Vector;
