import {
  RoverType,
  CameraType,
  RoverItem,
  RoverTypeInfo, 
} from "./types";

export enum UiActionTypes {
  RESET  = "UI/RESET",
  SELECT_ROVER_TYPE  = "UI/SELECT_ROVER_TYPE",
  SELECT_CAMERA_TYPE = "UI/SELECT_CAMERA_TYPE",
  SELECT_EARTH_DATE  = "UI/SELECT_EARTH_DATE",
  SELECT_SOL_MARTIAN_DAY = "UI/SELECT_SOL_MARTIAN_DAY",
  SEARCH = "UI/SEARCH",
  FETCH_METADATA = "UI/FETCH_METADATA",
  FETCH_METADATA_COMPLETED = "UI/FETCH_METADATA_COMPLETED",
  FETCH_ITEMS = "UI/FETCH_ITEMS",
  FETCH_ITEMS_COMPLETED = "UI/FETCH_ITEMS_COMPLETED",
}

export interface UiActionReset {
  type: UiActionTypes.RESET;
}

export interface UiActionSelectRoverType {
  type: UiActionTypes.SELECT_ROVER_TYPE;
  payload: RoverType;
}

export interface UiActionSelectCameraType {
  type: UiActionTypes.SELECT_CAMERA_TYPE;
  payload: CameraType;
}

export interface UiActionSelectEarthDate {
  type: UiActionTypes.SELECT_EARTH_DATE;
  payload: Date;
}

export interface UiActionSelectSolMartianDay {
  type: UiActionTypes.SELECT_SOL_MARTIAN_DAY;
  payload: number;
}

export interface UiActionSearch {
  type: UiActionTypes.SEARCH;
}

export interface UiActionFetchMetadata {
  type: UiActionTypes.FETCH_METADATA;
}

export interface UiActionFetchMetadataCompleted {
  type: UiActionTypes.FETCH_METADATA_COMPLETED;
  payload: RoverTypeInfo;
}

export interface UiActionFetchItems {
  type: UiActionTypes.FETCH_ITEMS;
}

export interface UiActionFetchItemsCompleted {
  type: UiActionTypes.FETCH_ITEMS_COMPLETED;
  payload: RoverItem[];
}
  
export type UiActions = UiActionSelectRoverType
  | UiActionReset
  | UiActionSelectCameraType
  | UiActionSelectEarthDate
  | UiActionSelectSolMartianDay
  | UiActionSearch
  | UiActionFetchMetadata
  | UiActionFetchMetadataCompleted
  | UiActionFetchItems
  | UiActionFetchItemsCompleted;