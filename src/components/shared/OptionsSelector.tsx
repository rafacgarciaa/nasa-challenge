import { useEffect, useState } from "react";
import RangeSlider from 'react-bootstrap-range-slider';
import DatePicker from "react-datepicker";

import { CameraType, FilterMode } from "../../store/ui/types";
import { Spinner } from "./Spinner";

import "react-datepicker/dist/react-datepicker.css";

interface IProps {
  cameras: CameraType[];
  cameraSelected?: CameraType | null;
  earthDateSelected?: Date | null;
  solMartialDaySelected?: number | null;
  loading?: boolean;
  filterMode?: FilterMode;
  solMartialDayMaximum?: number;
  solMartialDayMinimum?: number;
  onSelectCamera?: (selected: CameraType) => void;
  onSelectEarthDate?: (selected: Date) => void;
  onSelectSolMartianDay?: (selected: number) => void;
}

export const OptionsSelector = (props: IProps) => {
    const items: CameraType[] = props.cameras.length > 0
        ? [...props.cameras, 'ALL']
        : [];
    const itemSelected = props.cameraSelected || 'ALL';
    const modeSelected = props.filterMode || 'earth-date';

    const [currentMode, setMode] = useState(modeSelected);
    const isSolMartianDay = currentMode === 'sol-martian-day';
    const isEarthDate = currentMode === 'earth-date';
    
    useEffect(() => { setMode(modeSelected); }, [modeSelected]);

    const daySelected = props.solMartialDaySelected;
    const solMartialDaySelected =
        (daySelected === undefined || daySelected === null)
            ? 0
            : daySelected;
    const [currentDay, setDay] = useState(solMartialDaySelected);
    
    const dateSelected = props.earthDateSelected || new Date();
    const solMartialDayMax = props.solMartialDayMaximum || 100;
    const solMartialDayMin = props.solMartialDayMinimum || 0;

    return (
        <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
                {props.loading && <Spinner />}
                {!props.loading && items.map(curr =>
                    <button
                        type="button"
                        key={curr}
                        className={"btn btn-sm btn-outline-secondary" + (curr === itemSelected ? ' active' : '')}
                        onClick={() => props.onSelectCamera && props.onSelectCamera(curr)}>{curr}</button>)}
            </div>
            <div className="me-2">
                <div className="btn btn-sm btn-outline-secondary">
                    { isEarthDate && <>
                        Earth Date
                        <div>
                            <DatePicker
                                selected={dateSelected}
                                onChange={(date: Date) => props.onSelectEarthDate && props.onSelectEarthDate(date)}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                    </> }
                    { isSolMartianDay && <>
                        Martian Day: <span className="badge badge-light">{currentDay}</span>
                        <div style={{'margin': '3px 0'}}>
                            <RangeSlider
                                min={solMartialDayMin}
                                max={solMartialDayMax}
                                value={currentDay}
                                onChange={changeEvent => {
                                    const newDayValue = parseInt(changeEvent.target.value, 10);
                                    setDay(newDayValue);
                                }}
                                onAfterChange={changeEvent => {
                                    const newDayValue = parseInt(changeEvent.target.value, 10);
                                    props.onSelectSolMartianDay && props.onSelectSolMartianDay(newDayValue);
                                }}
                                tooltip="off"
                            />
                        </div>
                    </> }
                    <div className="dropdown">
                        <div
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="filterMenuButton">
                            <span data-feather="calendar"></span>
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="filterMenuButton">
                            <li>
                                <button
                                    type="button"
                                    className={"dropdown-item" + (isEarthDate ? ' active' : '')}
                                    onClick={() => setMode('earth-date')}>By Earth Date
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className={"dropdown-item" + (isSolMartianDay ? ' active' : '')}
                                    onClick={() => setMode('sol-martian-day')}>By Martian Sol
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}