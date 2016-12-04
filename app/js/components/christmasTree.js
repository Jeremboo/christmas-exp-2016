import { SkinnedMesh, MeshBasicMaterial, Object3D, Euler, Vector3, ArrowHelper, Ray } from 'three'

import props from '../core/props';
import { toRadians, getRandomFloat, getRandomEuler } from '../core/utils';


export default class ChristmasTree extends SkinnedMesh {
  constructor() {
    // https://www.youtube.com/watch?v=eEqB-eKcv7k
    const { geometry, material } = props.objects.get('christmasTree');
    super( geometry, new MeshBasicMaterial({ color: 'red', skinning: true }));
    this.castShadow = true;
    this.receiveShadow = true;
    this.scale.multiplyScalar(getRandomFloat(1, 2));

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
    const newWorldPosition = new Vector3().applyMatrix4( this.matrixWorld );
    // TODO Matriceeeee
    const dist = this.oldWorldPosition.clone().sub(newWorldPosition).multiplyScalar(0.1);
    // console.log(dist);
    this.oldWorldPosition.copy(newWorldPosition);
    // update skeleton
    // const time = Date.now() * 0.003;
    // const angle = new Euler(
    //   toRadians(10 * Math.cos(time)),
    //   toRadians(0),
    //   toRadians(10 * Math.sin(time)),
    // );
    for (let i = (this.skeleton.bones.length - 1); i > 0; i--) {
      // http://answers.unity3d.com/questions/46770/rotate-a-vector3-direction.html
      this.skeleton.bones[i].rotation.setFromVector3(dist);
    }
  }
}
