import { Vector3 } from 'three'

const props = {
  rotation: {
    force: 100,
    vel: 0.1,
  },
  lightPosition: new Vector3( 1.0, 1.0, 1.0 ),
  objects: new Map(),
  assets: [
    { name: 'skeleton', ex: 'json' },
  ]
};

export default props;
