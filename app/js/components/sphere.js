import { Mesh, SphereGeometry, ShaderMaterial, Vector3, Quaternion, Euler } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool'
import { toRadians } from '../core/utils';


import props from '../core/props';

const glslify = require( 'glslify' )

const vertexShader = glslify( '../shaders/sphere-vs.glsl' )
const fragmentShader = glslify( '../shaders/sphere-fs.glsl' )


export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 100, 30, 30 )
    const textureTool = new ThreejsTextureTool();

    const biomeTextureTool = textureTool.createImageTexture('assets/images/biome.jpg', 'Biome');
    const heightMapTextureTool = textureTool.createImageTexture('assets/images/heightMap.jpg', 'HeightMap');

    const material = new ShaderMaterial( {
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: {
          type: 'v3',
          value: new Vector3( 1.0, 1.0, 1.0 )
        },
        uLight: {
          type: 'v3',
          value: props.lightPosition,
        },
        uTexture: biomeTextureTool.uniform,
        uHeightMap: heightMapTextureTool.uniform,
      },
      transparent: true
    } )

    super( geometry, material )

    this.delta = new Vector3();
    this.savedQuaternions = new Quaternion();
  }

  update( ) {
    // update light position
    this.material.uniforms.uLight.value = props.lightPosition;
  }

  saveQuaternions() {
    this.savedQuaternions.copy(this.quaternion);
  }

  rotateToQuaternion(delta) {
    const deltaRotationQuaternion = new Quaternion()
    .setFromEuler(new Euler(
       toRadians(-delta.y * props.rotationForce),
       toRadians(delta.x * props.rotationForce),
       0,
       'XYZ'
    ));
    this.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.savedQuaternions);
  }
}
