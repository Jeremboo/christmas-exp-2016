import { Mesh, SphereGeometry, ShaderMaterial, Vector3, TextureLoader } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool'

const glslify = require( 'glslify' )

const vertexShader = glslify( '../shaders/sphere-vs.glsl' )
const fragmentShader = glslify( '../shaders/sphere-fs.glsl' )

export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 100, 30, 30 )
    const textureTool = new ThreejsTextureTool();

    const biomeTexture = textureTool.createImageTexture('assets/images/biome.jpg');
    const noiseTexture = textureTool.createImageTexture('assets/images/noise.jpg');
    // const material = biomeTexture.material;

    // TODO tu peux utiliser ton texture tool pour changer la texture là ?
    const loader = new TextureLoader()
    const tempTexture = loader.load( 'assets/images/biome.jpg',
    ( texture ) => {
      return texture
    } )

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
        },
        uTexture: {
          type: 't',
          value: tempTexture
        }
      },
      transparent: true
    } )

    super( geometry, material )

    this.targetedRotation = new Vector3()
  }

  update( lightPosition ) {
    // update light position
    this.material.uniforms.uLight.value = lightPosition

    // update rotation
    const distRotation = this.targetedRotation.clone().sub(this.rotation.toVector3());
    const rotationForce = distRotation.multiplyScalar(0.1);

    // update rotation with rotationForce
    this.rotation.setFromVector3(this.rotation.toVector3().add(rotationForce));
  }
}
