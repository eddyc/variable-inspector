import { setRowCount } from "./actions";
import "../MainContainer/Vector";

window.setRowCount = count => {
    window.dispatch(setRowCount(count));
};
