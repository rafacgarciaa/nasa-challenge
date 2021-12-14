import moment from "moment";

import { Manifest } from "../../services/nasa";
import { RoverTypeInfo } from "./types";
import { mapManifestToRoverTypeInfo } from "./mappers";

test('should map a Manifest to RoverTypeInfo', () => {
    const expected = createMetadataForManifest();
    const manifest = createManifest();
    const result = mapManifestToRoverTypeInfo(manifest);

    expect(result).toStrictEqual(expected);
  })

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