import { Mesh, SphereGeometry, ShaderMaterial, Vector3, Quaternion, Euler } from 'three';
import ThreejsTextureTool from 'threejs-texture-tool';

import { toRadians, worldToLocalDirection } from '../core/utils';
import props from '../core/props';

import ChristmasTree from './christmasTree';
import Tree from './tree';
import Deer from './deer';
import Mountain from './mountain';
import Candy from './candy';
import Star from './star';

const glslify = require( 'glslify' );

const vertexShader = glslify( '../shaders/planet-vs.glsl' );
const fragmentShader = glslify( '../shaders/planet-fs.glsl' );

export default class Planet extends Mesh {
  constructor() {
    const geometry = new SphereGeometry(props.planet.size, 100, 100);
    const textureTool = new ThreejsTextureTool();

    const biomeTextureTool = textureTool.createImageTexture('assets/images/biome.jpg', 'Biome');

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: {
          type: 'v3',
          value: new Vector3(0.93, 0.94, 0.95)
        },
        uLight: {
          type: 'v3',
          value: new Vector3(0, 80, 150)
        },
        uCeil: {
          type: 'f',
          value: 0.9
        },
        amplitude: {
          type: 'f',
          value: 8.0
        },
        uTexture: biomeTextureTool.uniform
      },
      transparent: true
    })

    super(geometry, material);

    // For raycaster
    this.name = 'planet'

    this.savedQuaternions = new Quaternion();
    this.basePos = new Vector3();
    this.currentPos = new Vector3();
    this.targetedPos = new Vector3();

    this.worldLightDirection = props.lightPosition;
    this.counter = 0;

    this.stars = [];
    this.christmasTrees = [];
    this.trees = [];
    this.mountains = [];
    this.deers = [];
    this.candies = [];

    for (let i = 0; i < 300; i++) {
      const star = new Star();
      this.add(star);
      this.stars.push(star);
    }
  }

  placeItems(callback) {
    this.test = new Mountain(
      new Vector3(
        props.test.x,
        props.test.y,
        props.test.z,
      ),
      props.test.scale,
      props.test.rotation,
    );
    this.add(this.test);

    for (let i = 0; i < props.christmasTrees.length; i++) {
      const christmasTree = new ChristmasTree(new Vector3(props.christmasTrees[i].x, props.christmasTrees[i].y, props.christmasTrees[i].z), props.christmasTrees[i].scale, props.christmasTrees[i].rotation);
      this.add(christmasTree);
      this.christmasTrees.push(christmasTree);
    }

    for (let i = 0; i < props.trees.length; i++) {
      const tree = new Tree(new Vector3(props.trees[i].x, props.trees[i].y, props.trees[i].z), props.trees[i].scale, props.trees[i].rotation);
      this.add(tree);
      this.trees.push(tree);
    }

    for (let i = 0; i < props.montains.length; i++) {
      const mountain = new Mountain(new Vector3(props.montains[i].x, props.montains[i].y, props.montains[i].z), props.montains[i].scale, props.montains[i].rotation);
      this.add(mountain);
      this.mountains.push(mountain);
    }

    for (let i = 0; i < props.deers.length; i++) {
      const deer = new Deer(new Vector3(props.deers[i].x, props.deers[i].y, props.deers[i].z), props.deers[i].scale, props.deers[i].rotation);
      this.add(deer);
      this.deers.push(deer);
    }

    for (let i = 0; i < props.candies.length; i++) {
      for (let j = 0; j < props.candies[i].positions.length; j++) {
        const candy = new Candy(
          props.candies[i].category,
          new Vector3(props.candies[i].positions[j].x, props.candies[i].positions[j].y, props.candies[i].positions[j].z),
          props.candies[i].positions[j].scale
        );
        this.add(candy);
        this.candies.push(candy);
      }
    }

    callback();
  }

  update() {
    if (this.test) {
      this.test.testUpdate(new Vector3(
        props.test.x,
        props.test.y,
        props.test.z,
      ), props.test.rotation, props.test.scale);
    }

    if (props.rotation.autoRotate) {
      this.targetedPos.x += 0.003;
      this.targetedPos.y += 0.002;
    }

    // updateRotation
    const dist = this.targetedPos.clone().sub(this.currentPos);
    const vel = dist.clone().multiplyScalar(props.rotation.vel);
    this.currentPos.add(vel);

    const delta = this.currentPos.clone().sub(this.basePos)
    const deltaRotationQuaternion = new Quaternion()
    .setFromEuler(new Euler(
       toRadians(-delta.y * props.rotation.force),
       toRadians(delta.x * props.rotation.force),
       0,
       'XYZ'
    ));
    this.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.savedQuaternions);

    // update objects
    for (let i = this.christmasTrees.length - 1; i >= 0; i--) {
      this.christmasTrees[i].update();
    }
    for (let i = this.trees.length - 1; i >= 0; i--) {
      this.trees[i].update();
    }
    for (let i = this.mountains.length - 1; i >= 0; i--) {
      this.mountains[i].update();
    }
    for (let i = this.deers.length - 1; i >= 0; i--) {
      this.deers[i].update();
    }
    for (let i = this.stars.length - 1; i >= 0; i--) {
      this.stars[i].update(this.counter + i);
    }
    for (let i = this.candies.length - 1; i >= 0; i--) {
      this.candies[i].update(this.counter);
    }

    // update light position
    let localVector = new Vector3()
    localVector = worldToLocalDirection(this, this.worldLightDirection, localVector);
    this.material.uniforms.uLight.value = localVector;
    this.material.uniforms.uCeil.value = props.shader.ceil;

    this.material.uniforms.amplitude.value = props.shader.amplitude;

    this.counter += 0.05;
  }

  startDragging(mousePos) {
    this.basePos.copy(mousePos);
    this.currentPos.copy(mousePos);
    this.targetedPos.copy(mousePos);
    this.savedQuaternions.copy(this.quaternion);
  }

  updateDragging(targetedPos) {
    this.targetedPos.copy(targetedPos);
  }
}
