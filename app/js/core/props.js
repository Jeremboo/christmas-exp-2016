import { Vector3 } from 'three'

import { getRandomNormalizedVector3 } from './utils';

const props = {
  loader: 0,
  rotation: {
    autoRotate: true,
    force: 100,
    vel: 0.1,
  },
  camera: {
    rotation: new Vector3(-0.3, 0, 0),
    position: new Vector3(0, 1000, 150), // y : 255
  },
  planet: {
    size: 200,
    vanishingDist: 5.0,
    endView: false,
  },
  shader: {
    ceil: 10.0,
    amplitude: 8.0
  },
  postProcess: {
    enabled: true
  },
  lightPosition: new Vector3(0.0, 1.0, 0.0),
  objects: new Map(),
  candies: [
    {
      category: 'lollipop',
      positions: [
        // First scene
        { x: 0, y: 1, z: 0.18, scale: 0.5 }
      ]
    },
    {
      category: 'peppermint',
      positions: [
        // { x: 0, y: 1, z:  0.18, scale: 4 }
      ]
    },
    {
      category: 'stick',
      positions: [
        // { x: 0, y: 1, z:  0.18, scale: 4 }
        // { x: 0, y: 1, z:  0.18, scale: 4 }
      ]
    }
    // {
    //   category: 'peppermint',
    //   positions: [
    //     { x: 0, y: 1, z: 0, scale: 1 },
    //     { x: 0, y: 1, z: 0, scale: 1 },
    //     { x: 0, y: 1, z: 0, scale: 1 }
    //   ]
    // },
    // {
    //   category: 'stick',
    //   positions: [
    //     { x: 0, y: 1, z: 0, scale: 1 },
    //     { x: 0, y: 1, z: 0, scale: 1 },
    //     { x: 0, y: 1, z: 0, scale: 1 }
    //   ]
    // },
  ],
  //   {
  //     category: 'lollipop',
  //     positions: [
  //       { x: 0, y: 1, z: 0, scale: 1 }
  //     ]
  //   },
  //   {
  //     category: 'candy',
  //     positions: [
  //       { x: 0, y: 1, z: 0, scale: 1 }
  //     ]
  //   },
  //   {
  //     category: 'stick',
  //     positions: [
  //       { x: 0, y: 1, z: 0, scale: 1 }
  //     ]
  //   },
  // ],
  montains: [
    // First scene
    { x: 0, y: 1, z: 0, scale: 7.2, rotation: 0 },
    { x: 0.21, y: 1, z: 0, scale: 4.5, rotation: -30 },
    { x: -0.21, y: 1, z: 0.15, scale: 3, rotation: 30 },
    { x: -0.15, y: 1, z: -0.06, scale: 3, rotation: 10 },
    { x: -0.18, y: 1, z: 0.06, scale: 3, rotation: -10 },
    // Second scene
  ],
  trees: [
    // First scene
    { x: -0.12, y: 1, z: 0.3, scale: 3, rotation: 0 },
    { x: 0.18, y: 1, z: 0.12, scale: 3, rotation: 0 },
  ],
  christmasTrees: [
    // First scene
    { x: 0.18, y: 1, z: 0.3, scale: 3, rotation: 70 },
    { x: 0.27, y: 1, z: 0.21, scale: 4.2, rotation: -45 },
    { x: 0.12, y: 1, z: 0.21, scale: 2.4, rotation: -45 },
    { x: -0.21, y: 1, z: 0.27, scale: 2.4, rotation: -45 },
  ],
  deers: [
    // First scene
    { x: 0, y: 1, z: 0.3, scale: 3, rotation: 0 },
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
      name: 'mountain',
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
      name: 'stick',
      ex: 'json',
      children: [
        'Candy',
      ],
    },
    {
      name: 'peppermint',
      ex: 'json',
      children: [
        'Cylindre',
      ],
    },
    {
      name: 'lollipop',
      ex: 'json',
      children: [
        'Arrondi.001',
        'Couvercle:1.001',
        'Couvercle:2.001',
        'Cylindre',
        'Extrusion:contr\u00f4l\u00e9e.001',
      ],
    },
    {
      name: 'deer',
      ex: 'json',
      children: [
        'Capsule.1',
        'Capsule.1_1',
        'Capsule.3',
        'Capsule.3_1',
        'Capsule.4',
        'Capsule.4_1',
        'corps',
        'eye_right',
        'eye_right.1',
        'jambes',
        'jambes.1',
        'jambes.2',
        'jambes.3',
        'nez',
        'queue',
        'sabot.1',
        'sabot.2',
        'sabot.3',
        'tete',
      ],
    },
    // {
    //   name: 'gift',
    //   ex: 'json',
    //   children: [
    //     'Cube.002',
    //     'Cube.1',
    //     'Cube.2',
    //     'Cube.3',
    //     'mono:0',
    //     'mono:1',
    //     'mono:2',
    //     'mono:3',
    //     'mono:4',
    //     'mono:5',
    //   ],
    // },
    {
      name: 'skeleton',
      ex: 'json',
      children: [],
    },
  ]
};

export default props;
