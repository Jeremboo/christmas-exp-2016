import { Object3D, Vector3, Ray } from 'three'

import props from '../core/props';
import { getRandomFloat, toRadians } from '../core/utils';


export default class ChristmasTree extends Object3D {
  constructor() {
    super();

    // var
    this.oldWorldPosition = new Vector3();

    // Position on the sphere
    this.position.x = Math.random() * 2 - 1;
    this.position.y = Math.random() * 2 - 1;
    this.position.z = Math.random() * 2 - 1;
    this.position.normalize();
    this.position.multiplyScalar( 200 );

    // Make object perpendicular
    this.up.negate();
    // Get vector to the center of the sphere
    const ray = new Ray(this.position);
    ray.lookAt(new Vector3());
    // calculate normal
    const axis = this.up.clone().cross(ray.direction).normalize();
    const angle = Math.acos(ray.direction.clone().dot(this.up));
    this.quaternion.setFromAxisAngle(axis, angle);

    // Add and custom ChristmasTree
    this.christmasTree = props.objects.get('christmasTree').clone();
    this.add(this.christmasTree);
    this.customize();
  }

  customize() {
    this.christmasTree.scale.multiplyScalar(getRandomFloat(1.5, 2.5));
    this.christmasTree.rotation.set(
      toRadians(getRandomFloat(0, 5)),
      toRadians(getRandomFloat(0, 360)),
      toRadians(getRandomFloat(0, 5))
    );
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
