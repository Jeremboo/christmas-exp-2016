import { Vector3 } from 'three'

import Item from './_item';

export default class ChristmasTree extends Item {
  constructor() {
    super('tree');

    this.oldWorldPosition = new Vector3();
  }

  update( ) {
    // get dist runned
    const newWorldPosition = new Vector3().applyMatrix4( this.matrixWorld );
    const dist = this.oldWorldPosition.clone().sub(newWorldPosition).multiplyScalar(0.9);
    this.oldWorldPosition.copy(newWorldPosition);

    // update skeleton with dist
    const tronc = this.getObjectByName('tronc');
    for (let i = (tronc.skeleton.bones.length - 1); i > 0; i--) {
      // http://answers.unity3d.com/questions/46770/rotate-a-vector3-direction.html
      tronc.skeleton.bones[i].rotation.setFromVector3(dist);
    }
  }
}
