import { Mesh, SphereGeometry, ShaderMaterial, Vector3, Quaternion, Euler } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool'

import { toRadians, worldToLocalDirection } from '../core/utils';
import props from '../core/props';

import ChristmasTree from './christmasTree';
import Candy from './candy';
import Star from './star'

const glslify = require( 'glslify' );

const SIZE = 200;
const vertexShader = glslify( '../shaders/planet-vs.glsl' )
const fragmentShader = glslify( '../shaders/planet-fs.glsl' )

export default class Planet extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( SIZE, 100, 100 )
    const textureTool = new ThreejsTextureTool();

    const biomeTextureTool = textureTool.createImageTexture('assets/images/biome.jpg', 'Biome');
    const heightMapTextureTool = textureTool.createImageTexture('assets/images/heightMap.jpg', 'HeightMap');

    const material = new ShaderMaterial( {
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: {
          type: 'v3',
          value: new Vector3( 0.93, 0.94, 0.95 )
        },
        uLight: {
          type: 'v3',
          value: new Vector3( 0, 80, 150 )
        },
        uCeil: {
          type: 'f',
          value: 0.9
        },
        uTexture: biomeTextureTool.uniform,
        uHeightMap: heightMapTextureTool.uniform,
      },
      transparent: true
    } )

    super( geometry, material )

    this.savedQuaternions = new Quaternion();
    this.baseMousePos = new Vector3();
    this.currentMousePos = new Vector3();
    this.targetedMousePos = new Vector3();

    this.christmasTrees = [];
    for (let i = 0; i < 100; i++) {
      const christmasTree = new ChristmasTree();
      this.add(christmasTree);
      this.christmasTrees.push(christmasTree);
    }

    this.candies = []
    for( let j = 0; j < 24; j++ ) {
      const candy = new Candy()
      this.add( candy )
      this.candies.push( candy )
    }

    this.stars = []
    for( let j = 0; j < 500; j++ ) {
      const star = new Star()
      this.add( star )
      this.stars.push( star )
    }

    // for raycaster
    this.name = 'planet'

    this.worldLightDirection = props.lightPosition
    this.counter = 0
  }

  update() {
    // updateRotation
    const dist = this.targetedMousePos.clone().sub(this.currentMousePos);
    const vel = dist.clone().multiplyScalar(props.rotation.vel);
    this.currentMousePos.add(vel);

    const delta = this.currentMousePos.clone().sub(this.baseMousePos)
    const deltaRotationQuaternion = new Quaternion()
    .setFromEuler(new Euler(
       toRadians(-delta.y * props.rotation.force),
       toRadians(delta.x * props.rotation.force),
       0,
       'XYZ'
    ));
    this.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.savedQuaternions);

    // update christmasTrees
    for (let i = this.christmasTrees.length - 1; i >= 0; i--) {
      this.christmasTrees[i].update();
    }

    for( const star of this.stars ) {
      star.update( this.counter + this.stars.indexOf( star ) )
    }

    for( const candy of this.candies ) {
      candy.update( this.counter + this.candies.indexOf( candy ) )
    }

    // update light position
    let localVector = new Vector3()
    localVector = worldToLocalDirection( this, this.worldLightDirection, localVector )
    this.material.uniforms.uLight.value = localVector
    this.material.uniforms.uCeil.value = props.shader.ceil

    this.counter += 0.05
  }

  startDragging(mousePos) {
    this.baseMousePos.copy(mousePos);
    this.currentMousePos.copy(mousePos);
    this.targetedMousePos.copy(mousePos);
    this.savedQuaternions.copy(this.quaternion);
  }

  updateDragging(targetedMousePos) {
    this.targetedMousePos.copy(targetedMousePos);
  }
}
