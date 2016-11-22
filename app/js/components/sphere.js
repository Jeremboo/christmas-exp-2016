import { Mesh, SphereGeometry, Vector3 } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool';


export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 20, 30, 30 )
    const textureTool = new ThreejsTextureTool();

    const biomeTexture = textureTool.createImageTexture('assets/images/biome.jpg');
    const noiseTexture = textureTool.createImageTexture('assets/images/noise.jpg');
    const material = biomeTexture.material;
    super( geometry, material );

    this.targetedRotation = new Vector3();
  }

  update() {
    // this.rotation.x += 0.01
    // this.rotation.y += 0.01

    // UPDATE ROTATION
    const distRotation = this.targetedRotation.clone().sub(this.rotation.toVector3());
    const rotationForce = distRotation.multiplyScalar(0.1);
    // - update rotation with rotationForce
    this.rotation.setFromVector3(this.rotation.toVector3().add(rotationForce));
  }
}
