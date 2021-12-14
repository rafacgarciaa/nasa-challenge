import { RoverType, CameraType } from "../../services/nasa";

export type FilterMode = 'sol-martian-day' | 'earth-date';

export interface RoverItem {
  id: number;
  src: string;
}

export interface RoverTypeInfo {
    name: string;
    dateLanding: Date;
    dateLaunch: Date;
    dateMax: Date;
    status: string;
    solMax: number;
    totalOfPhotos: number;
    camerasBySol: { [key: number]: CameraType[] };
    cameras: CameraType[]
}

export type { RoverType, CameraType };