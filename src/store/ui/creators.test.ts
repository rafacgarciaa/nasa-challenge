import moment from "moment";
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";

import { fetchManifest, Manifest } from "../../services/nasa";
import { UiActionTypes, UiActions } from "./actions";
import { UiState } from "./state";
import { RoverTypeInfo } from "./types";
import {
    reset,
    selectRoverType,
    selectCameraType,
    selectEarthDate,
    selectSolMartianDay,
    startFetchingMetadata,
    endFetchingMetadata,
    fetchMetadata,
} from "./creators";

jest.mock("../../services/nasa");

test('should return an initialized RESET action', () => {
  expect(reset()).toStrictEqual({
    type: UiActionTypes.RESET
  })
})

test('should return an initialized SELECT_ROVER_TYPE action', () => {
    expect(selectRoverType('curiosity')).toStrictEqual({
      type: UiActionTypes.SELECT_ROVER_TYPE,
      payload: 'curiosity'
    })
  })

test('should return an initialized SELECT_CAMERA_TYPE action', () => {
    expect(selectCameraType('ALL')).toStrictEqual({
      type: UiActionTypes.SELECT_CAMERA_TYPE,
      payload: 'ALL'
    })
  })

test('should return an initialized SELECT_EARTH_DATE action', () => {
    const date = new Date()
    expect(selectEarthDate(date)).toStrictEqual({
      type: UiActionTypes.SELECT_EARTH_DATE,
      payload: date
    })
  })

test('should return an initialized SELECT_SOL_MARTIAN_DAY action', () => {
    const day = 100;
    expect(selectSolMartianDay(day)).toStrictEqual({
      type: UiActionTypes.SELECT_SOL_MARTIAN_DAY,
      payload: day
    })
  })

test('should return an initialized FETCH_METADATA action', () => {
    expect(startFetchingMetadata()).toStrictEqual({
      type: UiActionTypes.FETCH_METADATA
    })
  })

test('should return an initialized FETCH_METADATA_COMPLETED action', () => {
    const expected = createMetadataForManifest();
    expect(endFetchingMetadata(expected)).toStrictEqual({
      type: UiActionTypes.FETCH_METADATA_COMPLETED,
      payload: expected
    })
  })

describe('test fetchMetadata - async action', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore<UiState, ThunkDispatch<UiState, void, UiActions>>(middlewares);
    const store = mockStore(createUiState());
    const mockedFetchManifest = fetchManifest as jest.Mock

    test(
        'should call several dispatch: SELECT_ROVER_TYPE, FETCH_METADATA and FETCH_METADATA_COMPLETED',
        async () => {
            mockedFetchManifest.mockResolvedValue(createManifest());

            const expectedActions = [
                { type: UiActionTypes.SELECT_ROVER_TYPE, payload: 'curiosity' },
                { type: UiActionTypes.FETCH_METADATA },
                {
                    type: UiActionTypes.FETCH_METADATA_COMPLETED,
                    payload: createMetadataForManifest(),
                }
            ];

            await store.dispatch(fetchMetadata('curiosity'));
            expect(store.getActions()).toEqual(expectedActions);
    });
});

function createUiState(): UiState {
    return {
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
    }
}

function createManifest(): Manifest {
    return {
        name: 'curiosity',
        landing_date: '2021-12-14',
        launch_date: '2021-12-14',
        status: 'active',
        max_sol: 1,
        max_date: '2021-12-14',
        total_photos: 1,
        photos: [
            {
                sol: 1,
                earth_date: '2021-12-14',
                total_photos: 1,
                cameras: ['FHAZ', 'RHAZ']
            }
        ]
    }
}

function createMetadataForManifest(): RoverTypeInfo {
    return {      
        dateLanding: moment('2021-12-14').toDate(),
        dateLaunch: moment('2021-12-14').toDate(),
        dateMax: moment('2021-12-14').toDate(),
        name: "curiosity",
        solMax: 1,
        status: "active",
        totalOfPhotos: 1,
        cameras: [
            "FHAZ",
            "RHAZ",
        ],
        camerasBySol: {
            "1": [
                "FHAZ",
                "RHAZ",
            ],
        },
    };
}