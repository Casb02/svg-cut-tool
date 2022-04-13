import {CoordList} from "../interfaces/CoordList";

const toPath = (coordList: CoordList[]) => {
    let path = "";
    for (let i = 0; i < coordList.length; i++) {
        const coord = coordList[i];
        if (i === 0) {
            path += `M ${coord.x} ${coord.y}`;
        } else {
            path += ` L ${coord.x} ${coord.y}`;
        }
    }
    return path;
};

const toPathClose = (coordList: CoordList[]) => {
    return `${toPath(coordList)} Z`;
};

export {toPath, toPathClose};