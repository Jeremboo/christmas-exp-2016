import { Mesh, SphereGeometry, ShaderMaterial, Vector3 } from 'three'

const glslify = require( 'glslify' )

const vertexShader = glslify( '../shaders/sphere-vs.glsl' )
const fragmentShader = glslify( '../shaders/sphere-fs.glsl' )

export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 100, 50, 50 )
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
          value: new Vector3( 1.0, 1.0, 1.0 )
        }
      },
      transparent: true
    } )
    super( geometry, material )
  }

  update( lightPosition ) {
    this.material.uniforms.uLight.value = lightPosition
    // this.rotation.x += 0.01
    // this.rotation.y += 0.01
  }
}
