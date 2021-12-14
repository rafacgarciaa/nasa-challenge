import {
    RoverItem,
    RoverTypeInfo,
    RoverType,
    CameraType,
    FilterMode,
} from "./types";

export interface UiState {
    roverType: RoverType | null;
    cameraType: CameraType;
    solMartialDay: number | null;
    earthDate: Date | null;
    filterMode: FilterMode;
    metadata: {
        info: RoverTypeInfo | null;
        loading: boolean;
    };
    photos: {
        items: RoverItem[];
        loading: boolean;
    };
}