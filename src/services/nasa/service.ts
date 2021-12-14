import axios from "axios";
import moment from "moment";

import config from "../../config";
import {
    RoverType,
    CameraType,
    Manifest,
    ManifestResponse,
    PhotoItem,
    PhotoItemsResponse,
} from "./types";

const {
    apiKey: API_KEY,
    basePath: BASE_PATH,
} = config.service.nasa;

export async function fetchPhotoItems(
    roverType: RoverType,
    cameraType: CameraType,
    earthDate: Date | null,
    solMartialDay: number | null,
    page: number,
): Promise<PhotoItem[]> {
    const url = `${BASE_PATH}/rovers/${roverType}/photos`;
    const response = await axios.get<PhotoItemsResponse>(url, {
        params: {
            api_key: API_KEY,
            page,
            ...(
                cameraType === 'ALL'
                    ? {}
                    : { camera: String(cameraType).toLowerCase() }
            ),
            ...(
                earthDate === null
                    ? {}
                    : { earth_date: moment(earthDate).format('YYYY-MM-DD') }
            ),
            ...(
                solMartialDay === null
                    ? {}
                    : { sol: solMartialDay }
            ),
        },
      });
    return response.data.photos;
}

export async function fetchManifest(roverType: RoverType): Promise<Manifest> {
    const url = `${BASE_PATH}/manifests/${roverType}`;
    const response = await axios.get<ManifestResponse>(url, {
        params: { api_key: API_KEY },
    });
    return response.data.photo_manifest;
}