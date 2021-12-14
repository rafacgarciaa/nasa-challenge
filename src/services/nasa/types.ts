export type RoverType = 'curiosity' | 'opportunity' | 'spirit';
export type CameraType = 'FHAZ' | 'RHAZ' | 'MAST' | 'CHEMCAM' | 'MAHLI' | 'MARDI' | 'NAVCAM' | 'PANCAM' | 'MINITES' | 'ALL';

export interface Rover {
  id: number;
  landing_date: string;
  launch_date: string;
  name: string;
  status: string;
}

export interface Camera {
  id: number;
  full_name: string;
  name: string;
  rover_id: number;
}

export interface PhotoItem {
  id: number;
  camera: Camera;
  earth_date: string;
  img_src: string;
  rover: Rover;
  sol: number;
}

export interface PhotoItemsResponse {
  photos: PhotoItem[];
}

export interface ManifestPhotoItem {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: CameraType[];
}

export interface Manifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: ManifestPhotoItem[];
}

export interface ManifestResponse {
  photo_manifest: Manifest
}