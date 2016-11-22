import { Scene, SpotLight, SpotLightHelper } from 'three'
import Sphere from '../components/sphere'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.meshCount = 0;
    this.meshListeners = [];

    this.sphere = new Sphere()
    this.addMesh( this.sphere );

    this.spotLight = new SpotLight( 0xFFFFFF, 1.0 )
    this.spotLight.position.set( 0, 80, 150 )
    this.spotLight.lookAt( 0, 0, 0 )
    this.spotLight.distance = 100
    this.spotLight.angle = 10 * Math.PI / 180
    this.add( this.spotLight )

    this.spotLightHelper = new SpotLightHelper( this.spotLight )
    this.add( this.spotLightHelper )

    this.counter = 0
  }

  update() {
    let i = this.meshCount;
    while (--i >= 0) {
      this.meshListeners[i].update(this.meshListeners);
    }

    // update spotlight
    this.spotLight.position.x = Math.sin( this.counter ) * 20
    this.spotLightHelper.update()
    this.counter += 0.01
  }

  addMesh(mesh) {
    this.add(mesh);
    if (!mesh.update) return;
    this.meshListeners.push(mesh);
    this.meshCount++;
  }

  removeMesh(mesh) {
    this.add(mesh);
    if (!mesh.update) return;
    this.meshListeners.push(mesh.update);
    this.meshCount--;
  }
}
