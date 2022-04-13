import { defineStore } from 'pinia'
import {CoordList} from "../interfaces/CoordList";
import {toPath, toPathClose} from "../functions/svg";

interface CoordsStore {
    coords: CoordList[];
    internId: any;
    id: any;
}

export type RootState = {
    objects: CoordsStore[];
    img: {
        src: string;
        width: number;
        height: number;
    };
};

export const useCoords = defineStore('coordsStore', {
    state: () => ({
        objects: [],
        img: {
            src: '',
            width: 0,
            height: 0
        }
    } as RootState),
    actions: {
        addCoords(id: any, coords: CoordList[]) {
            if (!id && !coords) {
                return;
            }
            const objId: number = this.$state.objects.length + 1;
            this.$state.objects.push({
                id: objId,
                internId: id,
                coords: coords,
            });
        },
    },
    getters: {
        // get all coords as toPath string array
        getCoords(state: RootState): string[] {
            const paths: string[] = [];
            state.objects.forEach((obj: CoordsStore) => {
                paths.push(toPathClose(obj.coords));
            });
            return paths;
        },
    }
})
