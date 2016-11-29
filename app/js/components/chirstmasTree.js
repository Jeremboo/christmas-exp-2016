import { SkinnedMesh, MeshBasicMaterial, Object3D, Euler } from 'three'

import props from '../core/props';
import { toRadians, getRandomFloat, getRandomEuler } from '../core/utils';


export default class ChirstmasTree extends Object3D {
  constructor() {
    super();
    // https://www.youtube.com/watch?v=eEqB-eKcv7k&index=15&list=PLOGomoq5sDLutXOHLlESKG2j9CCnCwVqg
    // https://www.youtube.com/watch?v=eEqB-eKcv7k
    const { geometry, material } = props.objects.get('christmasTree');
    this.christmasTree = new SkinnedMesh( geometry, new MeshBasicMaterial({ color: 'red', skinning: true }) );
    this.christmasTree.castShadow = true;
    this.christmasTree.receiveShadow = true;
    this.christmasTree.position.z = 100; // TODO position from earth
    this.christmasTree.rotation.set( toRadians(90), 0, 0);
    this.christmasTree.scale.multiplyScalar(getRandomFloat(1, 2));

    this.rotation.copy(getRandomEuler());
    this.add(this.christmasTree);
  }

  update( ) {
    // update skeleton
    let i;
    const bonesLenght = this.christmasTree.skeleton.bones.length;
    const time = Date.now() * 0.003;
    const angle = new Euler(
      toRadians(10 * Math.cos(time)),
      toRadians(0),
      toRadians(10 * Math.sin(time)),
    );
    for (i = 0; i < bonesLenght; i++) {
      this.christmasTree.skeleton.bones[i].rotation.copy(angle);
    }
  }
}
