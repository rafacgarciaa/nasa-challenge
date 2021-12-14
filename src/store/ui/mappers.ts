import moment from "moment";

import { Manifest, PhotoItem } from "../../services/nasa";
import { RoverTypeInfo, CameraType, RoverItem } from "./types";

export function mapManifestToRoverTypeInfo(data: Manifest): RoverTypeInfo {
    const camerasBySol: { [key: number]: CameraType[] } = {};
    data.photos.forEach(p => camerasBySol[p.sol] = p.cameras);
    const cameras = new Set(Object.values(camerasBySol).flatMap(items => items));

    return {
        name: data.name,
        dateLanding: moment(data.landing_date).toDate(),
        dateLaunch: moment(data.launch_date).toDate(),
        dateMax: moment(data.max_date).toDate(),
        status: data.status,
        solMax: data.max_sol,
        totalOfPhotos: data.total_photos,
        camerasBySol,
        cameras: Array.from(cameras)
    };
}

export function mapPhotoItemToRoverItem(item: PhotoItem): RoverItem {
    return {
        id: item.id,
        src: item.img_src,
    };
}