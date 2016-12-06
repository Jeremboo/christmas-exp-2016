import { Vector3 } from 'three'

const props = {
  rotation: {
    force: 100,
    vel: 0.1,
  },
  camera: {
    rotation: new Vector3(-0.3, 0, 0),
    position: new Vector3(0, 254, 143)
  },
  shader: {
    ceil: 0.95
  },
  lightPosition: new Vector3(0.0, 1.0, 0.0),
  objects: new Map(),
  assets: [
    {
      name: 'christmasTree',
      ex: 'json',
      children: [
        'eye_right',
        'eye_left',
        'Cône',
        'Cône.1',
        'Cône.2',
        'tronc',
      ],
    },
    {
      name: 'skeleton',
      ex: 'json',
      children: [],
    },
  ]
};

export default props;
