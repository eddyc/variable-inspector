import { SET_VARIABLE } from "./types";
export default class Vector {
    constructor({ data = [], label = "" }) {
        this.data = data;
        this.label = label;
    }

    print = () => {
        console.log("printing");
    };

    negate = () => {
        return singleVector(this, e => -e, `-${this.label}`);
    };
    subtract = input => {
        if (typeof input === "number") {
            return singleVector(this, a => a - input, `${this.label}-${input}`);
        } else if (typeof input === "object") {
            return vectorVector(this, input, (a, b) => a - b, "-");
        }
    };
    multiply = input => {
        if (typeof input === "number") {
            return singleVector(this, a => a * input, `${this.label}*${input}`);
        } else if (typeof input === "object") {
            return vectorVector(this, input, (a, b) => a * b, "*");
        }
    };
    add = input => {
        if (typeof input === "number") {
            return singleVector(this, a => a + input, `${this.label}+${input}`);
        } else if (typeof input === "object") {
            return vectorVector(this, input, (a, b) => a + b, "+");
        }
    };
    set = () => {
        window.dispatch({ type: SET_VARIABLE, payload: this });
        window[this.label] = new Vector({ ...this });
        return;
    };
}

const singleVector = (input, operation, label = "") => {
    return new Vector({
        data: input.data.map(e => {
            return operation(e);
        }),
        label
    });
};

const vectorVector = (inputA, inputB, operation, label = "") => {
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
        label: `${inputA.label}${label}${inputB.label}`
    });
};

window.Vector = Vector;
