import { Object3D, Vector3, Ray } from 'three'

import props from '../core/props';
import { getRandomFloat } from '../core/utils';


export default class ChristmasTree extends Object3D {
  constructor() {
    super();
    this.add(props.objects.get('christmasTree').clone());
    this.scale.multiplyScalar(getRandomFloat(2, 4));

    // Position on sphere
    this.position.x = Math.random() * 2 - 1;
    this.position.y = Math.random() * 2 - 1;
    this.position.z = Math.random() * 2 - 1;
    this.position.normalize();
    this.position.multiplyScalar( 200 );

    // Make onject perpendicular
    const up = new Vector3(0, -1, 0);
    const ray = new Ray(this.position);
    ray.lookAt(new Vector3());
    // // calculate normal to center of sphere
    const axis = up.clone().cross(ray.direction).normalize();
    const angle = Math.acos(ray.direction.clone().dot(up));
    this.quaternion.setFromAxisAngle(axis, angle);

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
