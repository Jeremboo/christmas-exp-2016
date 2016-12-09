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
  candies: [
    {
      category: 'lollipop',
      positions: [
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 }
      ]
    },
    {
      category: 'candy',
      positions: [
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 }
      ]
    },
    {
      category: 'stick',
      positions: [
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 },
        { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1 }
      ]
    },
  ],
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
      name: 'tree',
      ex: 'json',
      children: [
        'branche_0',
        'branche_1',
        'branche_2',
        'branche_3',
        'branche_4',
        'branche_5',
        'branche_6',
        'Cône',
        'Cône.1',
        'Cône.2',
        'Cône.3',
        'Cône.4',
        'Cône.5',
        'Cône.6',
        'tronc',
      ],
    },
    {
      name: 'mount',
      ex: 'json',
      children: [
        'arm_left',
        'arm_right',
        'eye_left',
        'eye_right',
        'montagne.2',
        'nez',
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
