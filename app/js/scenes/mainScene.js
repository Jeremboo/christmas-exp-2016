import { Scene, AmbientLight, HemisphereLight } from 'three';
import Skybox from '../components/skybox';
import Planet from '../components/planet';
import props from '../core/props';


export default class MainScene extends Scene {
  constructor() {
    super()
    this.meshCount = 0;
    this.meshListeners = [];

    const mainLight = new HemisphereLight(0xffffff, 0x072a3e, 1);
    mainLight.position.set(0, 400, 200);
    this.add(mainLight);

    this.skybox = new Skybox()
    this.add(this.skybox);

    this.planet = new Planet()
    this.addMesh(this.planet);
  }

  update() {
    let i = this.meshCount;
    while (--i >= 0) {
      this.meshListeners[i]();
    }
  }

  /**
   * Add mesh into the loop possibly with update params
   * @param {Object3d} mesh
   * @param {Array} params (All another params passed in parameters)
   */
  addMesh(mesh, ...params) {
    this.add(mesh);
    if (!mesh.update) return;
    this.meshListeners.push(() => { mesh.update(...params); });
    this.meshCount++;
  }

  removeMesh(mesh) {
    // TODO use map to remove the entry propertly
    const idx = this.meshListeners.indexOf(() => { mesh.update(); });
    this.meshListeners.splice(idx, 1);
    this.meshCount--;
  }
}
