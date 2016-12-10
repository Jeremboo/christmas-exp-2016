import { Vector3 } from 'three'

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
    ceil: 0.0,
    amplitude: 8.0,
    postProcess: true
  },
  lightPosition: new Vector3(0.0, 1.0, 0.0),
  objects: new Map(),
  candies: [
    {
      category: 'lollipop',
      positions: [
        // First scene
        { x: 0, y: 1, z: 0.06, scale: 1 }
      ]
    }
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
    { x: 0, y: 1, z: 0, scale: 2.4, rotation: 0 },
    { x: 0.07, y: 1, z: 0, scale: 1.5, rotation: -30 },
    { x: -0.07, y: 1, z: 0.05, scale: 1, rotation: 30 },
    { x: -0.05, y: 1, z: -0.02, scale: 1, rotation: 10 },
    { x: -0.06, y: 1, z: 0.02, scale: 1, rotation: -10 },
    // Second scene
  ],
  trees: [
    // First scene
    { x: -0.04, y: 1, z: 0.1, scale: 1, rotation: 0 },
    { x: 0.06, y: 1, z: 0.04, scale: 1, rotation: 0 },
  ],
  christmasTrees: [
    // First scene
    { x: 0.06, y: 1, z: 0.1, scale: 1, rotation: 70 },
    { x: 0.09, y: 1, z: 0.07, scale: 1.4, rotation: -45 },
    { x: 0.04, y: 1, z: 0.07, scale: 0.8, rotation: -45 },
    { x: -0.07, y: 1, z: 0.09, scale: 0.8, rotation: -45 },
  ],
  deers: [
    // First scene
    { x: 0, y: 1, z: 0.1, scale: 1, rotation: 0 },
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
