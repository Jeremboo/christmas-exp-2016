import { Scene } from 'three'
import Sphere from '../components/sphere'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.meshCount = 0;
    this.meshListeners = [];

    this.sphere = new Sphere()
    this.sphere.position.z = -100;

    this.addMesh( this.sphere );
  }

  update() {
    let i = this.meshCount;
    while (--i >= 0) {
      this.meshListeners[i].update(this.meshListeners);
    }
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
