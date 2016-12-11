import { Vector3 } from 'three'

import { getRandomNormalizedVector3 } from './utils';

const props = {
  test: {
    x: 0.1,
    y: 0.9,
    z: 0.1,
    rotation: 0,
    scale: 2,
  },
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
        { x: 0, y: 1, z: 0.18, scale: 4 }, // 0.5
        { x: 0.1, y: -0.9, z: 0.1, scale: 4 },
        { x: 1, y: 0, z: 0, scale: 4 },
      ]
    },
    // {
    //   category: 'peppermint',
    //   positions: [
    //     { x: 1, y: 1, z: 1, scale: 0.5 },
    //     { x: 1, y: 1, z: 0, scale: 0.5 },
    //     { x: 1, y: 0, z: 1, scale: 0.5 },
    //   ]
    // },
    {
      category: 'stick',
      positions: [
        { x: -1, y: 0, z: 0, scale: 6 }, // 2
        { x: 0, y: 0, z: -1, scale: 6 },
        { x: 0, y: 0, z: 1, scale: 6 },
      ]
    },
  ],
  montains: [
    // 1.1
    { x: 0, y: 1, z: 0, scale: 7.2, rotation: 0 },
    { x: 0.21, y: 1, z: 0, scale: 4.5, rotation: -30 },
    { x: -0.21, y: 1, z: 0.15, scale: 3, rotation: 30 },
    { x: -0.15, y: 1, z: -0.06, scale: 3, rotation: 10 },
    { x: -0.18, y: 1, z: 0.06, scale: 3, rotation: -10 },
    // 2.1
    { x: -1, y: -0.14, z: -0.45, scale: 6 },
    { x: -1, y: 0.24, z: -0.34, scale: 4 },
    { x: -1, y: 0.06, z: -0.36, scale: 4 },
    { x: -1, y: 0.14, z: 0.53, scale: 7 },
    { x: -1, y: -0.38, z: 0.59, scale: 7 },
    { x: -1, y: -0.32, z: -0.1, scale: 7 },
    // 2.3
    { x: 0, y: 0.1, z: 1.1, scale: 7, rotation: 0.1 },
    { x: 0.2, y: 0.12, z: 1.13, scale: 5, rotation: -28 },
  ],
  trees: [
    // 1.1
    { x: -0.12, y: 1, z: 0.3, scale: 3, rotation: 0 },
    { x: 0.18, y: 1, z: 0.12, scale: 3, rotation: 0 },
    // 2.1
    { x: -1, y: 0.08, z: 0.21, scale: 2.6 },
    { x: -1, y: -0.14, z: -0.14, scale: 3 },
    { x: -1, y: 0.8, z: 0.28, scale: 2.4 },
    { x: -1, y: 0.1, z: -0.07, scale: 3.1 },
    { x: -1, y: 0.06, z: 0.3, scale: 2.1 },
    { x: -1, y: -0.14, z: 0.24, scale: 2.1 },
    // 2.3

  ],
  christmasTrees: [
    // 1.1
    { x: 0.18, y: 1, z: 0.3, scale: 3, rotation: 70 },
    { x: 0.27, y: 1, z: 0.21, scale: 4.2, rotation: -45 },
    { x: 0.12, y: 1, z: 0.21, scale: 2.4, rotation: -45 },
    { x: -0.21, y: 1, z: 0.27, scale: 2.4, rotation: -45 },
    // 2.1
    { x: -1, y: 0.3, z: 0.1, scale: 3 },
    { x: -1, y: 0.4, z: 0.4, scale: 2.4 },
    { x: -1, y: 0.15, z: 0.1, scale: 3.1 },
    { x: -1, y: 0.24, z: 0.24, scale: 1.5 },
    { x: -1, y: -0.05, z: 0.37, scale: 2.5 },
    { x: -1, y: -0.18, z: 0.28, scale: 3.0 },
    { x: -1, y: -0.21, z: -0.01, scale: 1.5 },
    { x: -1, y: -0.32, z: 0.15, scale: 1.9 },
    { x: -1, y: -0.16, z: 0.14, scale: 2.3 },
    { x: -1, y: 0.04, z: -0.18, scale: 2.9 },
    { x: -1, y: 0.17, z: -0.03, scale: 1.3 },
    { x: -1, y: 0.17, z: -0.15, scale: 1.8 },
  ],
  deers: [
    // 1.1
    { x: 0, y: 1, z: 0.3, scale: 3, rotation: 0 },
    // 2.1
    { x: -1, y: -0.01, z: 0.17, scale: 3, rotation: 180 },
    { x: -1, y: -0.03, z: 0.12, scale: 1.5, rotation: 175 },
    { x: -1, y: 0.04, z: 0.12, scale: 2.7, rotation: 190 },
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
  ]
};

export default props;
