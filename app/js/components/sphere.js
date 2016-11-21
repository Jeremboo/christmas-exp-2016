import { Mesh, SphereGeometry } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool';


export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 20, 30, 30 )
    const textureTool = new ThreejsTextureTool();

    const biomeTexture = textureTool.createImageTexture('assets/images/biome.jpg');
    const noiseTexture = textureTool.createImageTexture('assets/images/noise.jpg');
    const material = biomeTexture.material;
    super( geometry, material )
  }

  update() {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}
