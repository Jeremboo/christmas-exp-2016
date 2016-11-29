import { SkinnedMesh, MeshBasicMaterial, Object3D, Euler, Vector3 } from 'three'

import props from '../core/props';
import { toRadians, getRandomFloat, getRandomEuler } from '../core/utils';


export default class ChristmasTree extends Object3D {
  constructor() {
    super();
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

    this.oldWorldPosition = new Vector3();
  }

  update( ) {
    const newWorldPosition = new Vector3().applyMatrix4( this.christmasTree.matrixWorld );
    // TODO Matriceeeee
    const dist = this.oldWorldPosition.clone().sub(newWorldPosition).multiplyScalar(0.1);
    console.log(dist);
    this.oldWorldPosition.copy(newWorldPosition);
    // update skeleton
    // const time = Date.now() * 0.003;
    // const angle = new Euler(
    //   toRadians(10 * Math.cos(time)),
    //   toRadians(0),
    //   toRadians(10 * Math.sin(time)),
    // );
    for (let i = (this.christmasTree.skeleton.bones.length - 1); i > 0; i--) {
      this.christmasTree.skeleton.bones[i].rotation.setFromVector3(dist);
    }
  }
}
