import { Mesh, SphereGeometry, ShaderMaterial, Vector3 } from 'three'

const glslify = require( 'glslify' )

const vertexShader = glslify( '../shaders/skybox-vs.glsl' )
const fragmentShader = glslify( '../shaders/skybox-fs.glsl' )

export default class Skybox extends Mesh {
  constructor() {
    const sphereGeometry = new SphereGeometry( 1000, 30, 30 )
    const sphereMaterial = new ShaderMaterial( {
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor1: {
          type: 'v3',
          value: new Vector3( 0.01, 0.03, 0.14 )
        },
        uColor2: {
          type: 'v3',
          value: new Vector3( 0.0, 0.0, 0.0 )
        }
      }
    } )

    super( sphereGeometry, sphereMaterial )

    this.scale.x = -1
    this.rotation.x = 90 * Math.PI / 180
  }
}
