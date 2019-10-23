import { setRowCount } from "./actions";
import "./Vector";

window.setRowCount = count => {
    window.dispatch(setRowCount(count));
};
