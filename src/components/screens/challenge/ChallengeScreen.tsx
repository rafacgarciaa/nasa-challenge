import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    fetchMetadata,
    fetchItems,
    selectRoverType,
    selectCameraType,
    selectEarthDate,
    selectSolMartianDay,
} from "../../../store/ui/creators";
import {
    getSelectedRoverType,
    getSelectedCamera,
    getCurrentFilterMode,
    getSelectedEarthDate,
    getSelectedSolMartialDay,
    getInfoMetadata,
    isLoadingInfoMetadata,
    getLoadedPhotos,
    isLoadingPhotos,
} from "../../../store/ui/selectors";
import { GridImage } from "../../shared/GridImage";
import { OptionsSelector } from "../../shared/OptionsSelector";
import { RoverSelector } from "../../shared/RoverSelector";
import { Spinner } from "../../shared/Spinner";

export const ChallengeScreen = () => {
    const dispatch = useDispatch();
    const curRoverType = useSelector(getSelectedRoverType);
    const curCamera = useSelector(getSelectedCamera);
    const curFilterMode = useSelector(getCurrentFilterMode);
    const curEarthDate = useSelector(getSelectedEarthDate);
    const curSolMartialDay = useSelector(getSelectedSolMartialDay);
    const loadedMdInfo = useSelector(getInfoMetadata);
    const isLoadingMdInfo = useSelector(isLoadingInfoMetadata);
    const loadedItems = useSelector(getLoadedPhotos);
    const isLoadingItems = useSelector(isLoadingPhotos);

    useEffect(() => {
        if (curRoverType !== null) {
            dispatch(fetchMetadata(curRoverType));
        }
    }, [dispatch, curRoverType]);

    useEffect(() => {
        if (curRoverType !== null && curCamera !== null) {
            const action = (curFilterMode === 'earth-date')
                ? fetchItems(curRoverType, curCamera, curEarthDate, null)
                : fetchItems(curRoverType, curCamera, null, curSolMartialDay);
            dispatch(action);
        }
    }, [
        dispatch,
        curRoverType,
        curCamera,
        curEarthDate,
        curSolMartialDay,
        curFilterMode,
    ]);

    return (
        <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 mt-3 border-bottom">
                <RoverSelector
                    rovers={['curiosity', 'opportunity', 'spirit']}
                    roverSelected={curRoverType}
                    onSelectRover={rover => dispatch(selectRoverType(rover))}
                />
                {curRoverType && <OptionsSelector
                    cameras={loadedMdInfo?.cameras || []}
                    cameraSelected={curCamera}
                    earthDateSelected={curEarthDate}
                    solMartialDaySelected={curSolMartialDay}
                    onSelectCamera={camera => dispatch(selectCameraType(camera))}
                    onSelectEarthDate={date => dispatch(selectEarthDate(date))}
                    onSelectSolMartianDay={day => dispatch(selectSolMartianDay(day))}
                    loading={isLoadingMdInfo}
                    filterMode={curFilterMode}
                    solMartialDayMaximum={loadedMdInfo?.solMax}
                />}
            </div>
            {curRoverType && isLoadingItems && <Spinner />}
            {curRoverType && !isLoadingItems && (
                loadedItems.length === 0
                    ? (
                        <div className="alert alert-danger" role="alert">
                            <strong>No recent photos from those filter options.</strong>
                            Try a different combination of filters.
                        </div>
                    ) : (
                        <GridImage items={loadedItems} />
                    )
            )}
        </main>
    );
}