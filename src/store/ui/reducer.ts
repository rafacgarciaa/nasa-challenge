import { Reducer } from "redux";

import { UiActions, UiActionTypes } from "./actions";
import { UiState } from "./state";

const initialState: UiState = {
  roverType: null,
  cameraType: 'ALL',
  solMartialDay: 0,
  earthDate: new Date(),
  filterMode: 'earth-date',
  metadata: {
      info: null,
      loading: false
  },
  photos: {
      items: [],
      loading: false
  }
};

export const uiReducer: Reducer<UiState, UiActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UiActionTypes.RESET: {
      return {
        ...initialState
      };
    }

    case UiActionTypes.SELECT_ROVER_TYPE: {
      return {
        ...initialState,
        roverType: action.payload
      };
    }

    case UiActionTypes.SELECT_CAMERA_TYPE: {
      return {
        ...state,
        cameraType: action.payload,
        photos: {
          items: [],
          loading: false
        }
      };
    }

    case UiActionTypes.SELECT_EARTH_DATE: {
      return {
        ...state,
        earthDate: action.payload,
        filterMode: 'earth-date',
        photos: {
          items: [],
          loading: false
        }
      };
    }

    case UiActionTypes.SELECT_SOL_MARTIAN_DAY: {
      return {
        ...state,
        solMartialDay: action.payload,
        filterMode: 'sol-martian-day',
        photos: {
          items: [],
          loading: false
        }
      };
    }

    case UiActionTypes.FETCH_METADATA: {
      return {
        ...state,
        metadata: {
          info: null,
          loading: true
        },
      };
    }

    case UiActionTypes.FETCH_METADATA_COMPLETED: {
      return {
        ...state,
        metadata: {
          info: action.payload,
          loading: false
        },
      };
    }

    case UiActionTypes.FETCH_ITEMS: {
      return {
        ...state,
        photos: {
          items: state.photos.items,
          loading: true
        },
      };
    }

    case UiActionTypes.FETCH_ITEMS_COMPLETED: {
      return {
        ...state,
        photos: {
          items: [
            ...state.photos.items,
            ...action.payload,
          ],
          loading: false
        },
      };
    }
  }
  
  return state || initialState;
};