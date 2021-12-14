import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { fetchManifest, fetchPhotoItems } from "../../services/nasa";
import { RoverType, RoverTypeInfo, RoverItem, CameraType } from "./types";
import { UiActions, UiActionTypes } from "./actions";
import { UiState } from "./state";
import { mapManifestToRoverTypeInfo, mapPhotoItemToRoverItem } from "./mappers";

export const reset: ActionCreator<Action> =
  () => ({
    type: UiActionTypes.RESET
  });

export const selectRoverType: ActionCreator<Action> =
  (roverType: RoverType) => ({
    type: UiActionTypes.SELECT_ROVER_TYPE,
    payload: roverType
  });

export const selectCameraType: ActionCreator<Action> =
  (cameraType: CameraType) => ({
    type: UiActionTypes.SELECT_CAMERA_TYPE,
    payload: cameraType
  });

export const selectEarthDate: ActionCreator<Action> =
  (date: Date) => ({
    type: UiActionTypes.SELECT_EARTH_DATE,
    payload: date
  });

export const selectSolMartianDay: ActionCreator<Action> =
  (day: number) => ({
    type: UiActionTypes.SELECT_SOL_MARTIAN_DAY,
    payload: day
  });

export const startFetchingMetadata: ActionCreator<Action> =
  () => ({ type: UiActionTypes.FETCH_METADATA });

export const endFetchingMetadata: ActionCreator<Action> =
  (metadata: RoverTypeInfo) => ({
    type: UiActionTypes.FETCH_METADATA_COMPLETED,
    payload: metadata,
  });


export const fetchMetadata: ActionCreator<
  ThunkAction<Promise<void>, UiState, void, UiActions>
> = (roverType: RoverType) => {
  return async (
    dispatch: Dispatch<UiActions>,
  ): Promise<void> => {
    dispatch(selectRoverType(roverType));
    dispatch(startFetchingMetadata());
    
    const metadata = await fetchManifest(roverType);
    const info = mapManifestToRoverTypeInfo(metadata);
    dispatch(endFetchingMetadata(info));
  };
};

export const startFetchingItems: ActionCreator<Action> =
  () => ({ type: UiActionTypes.FETCH_ITEMS });

export const endFetchingItems: ActionCreator<Action> =
  (items: RoverItem[]) => ({
    type: UiActionTypes.FETCH_ITEMS_COMPLETED,
    payload: items,
  });

  export const fetchItems: ActionCreator<
  ThunkAction<Promise<void>, UiState, void, UiActions>
> = (
  roverType: RoverType,
  cameraType: CameraType,
  earthDate: Date | null = null,
  solMartianDay: number | null = null,
) => {
  return async (
    dispatch: Dispatch<UiActions>,
  ): Promise<void> => {
    dispatch(startFetchingItems());
    
    const photos = await fetchPhotoItems(
      roverType,
      cameraType,
      earthDate,
      solMartianDay,
      1,
    );
    const items = photos.map(mapPhotoItemToRoverItem);
    dispatch(endFetchingItems(items));
  };
};