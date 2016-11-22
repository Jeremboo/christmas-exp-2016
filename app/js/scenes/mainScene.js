import { Scene } from 'three'
import Sphere from '../components/sphere'
import Projector from '../components/projector'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.meshCount = 0;
    this.meshListeners = [];

    this.sphere = new Sphere()
    this.addMesh( this.sphere );

    this.projector = new Projector();
    this.addMesh( this.projector );
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
