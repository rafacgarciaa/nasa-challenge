import {
    CameraType,
    RoverItem,
    RoverType,
    RoverTypeInfo,
    FilterMode
} from "../../store/ui/types";
import { AppState } from "../../store";

export const getSelectedRoverType =
    (state: AppState): RoverType | null => state.ui.roverType;

export const getSelectedCamera =
    (state: AppState): CameraType => state.ui.cameraType;

export const getSelectedEarthDate =
    (state: AppState): Date | null => state.ui.earthDate;

export const getSelectedSolMartialDay =
    (state: AppState): number | null => state.ui.solMartialDay;

export const getInfoMetadata =
    (state: AppState): RoverTypeInfo | null => state.ui.metadata.info;

export const isLoadingInfoMetadata =
    (state: AppState): boolean => state.ui.metadata.loading;

export const getLoadedPhotos = 
    (state: AppState): RoverItem[] => state.ui.photos.items;

export const isLoadingPhotos =
    (state: AppState): boolean => state.ui.photos.loading;

export const getCurrentFilterMode =
    (state: AppState): FilterMode => state.ui.filterMode;
