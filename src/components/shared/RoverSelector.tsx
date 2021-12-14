import { RoverType } from "../../store/ui/types";
import { toTitleCase } from "../../utils/strings";

interface IProps {
  rovers: RoverType[];
  roverSelected?: RoverType | null;
  onSelectRover?: (selected: RoverType) => void;
}


export const RoverSelector = (props: IProps) => {
    const selected = props.roverSelected
    return (
        <>
            <h1 className="h2">{ selected ? toTitleCase(selected) : 'N/A' }</h1>
            <div className="dropdown" style={{
                'position': 'absolute',
                'left': selected ? `${selected.length * 1.3}em` : '2.5em',
            }}>
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose a rover type
                </button>
                <ul className="dropdown-menu">
                    {props.rovers.map(item =>
                        <li key={item}>
                            <button
                                onClick={() => props.onSelectRover && props.onSelectRover(item)}
                                className={"dropdown-item" + (selected === item ? ' active' : '')}>{toTitleCase(item)}
                            </button>
                        </li>)}
                </ul>
            </div>
        </>
    );
}