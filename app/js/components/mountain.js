import { Vector3, Ray } from 'three'

import Item from './_item';

import props from '../core/props';
import { getRandomFloat } from '../core/utils';

export default class Mountain extends Item {
  constructor(position, scale = getRandomFloat(3, 7), rotation) {
    super('mountain', position, scale, rotation);

    this.position.normalize();
    this.position.multiplyScalar(props.planet.size - 3.5);

    const ray = new Ray(this.position);
    ray.lookAt(new Vector3());
    // calculate normal
    const axis = this.up.clone().cross(ray.direction).normalize();
    const angle = Math.acos(ray.direction.clone().dot(this.up));
    this.quaternion.setFromAxisAngle(axis, angle);
  }

  // testUpdate(position, rotation, scale) {
  //   this.position.copy(position);
  //   this.position.normalize();
  //   this.position.multiplyScalar(props.planet.size - 3.5);
  //   // this.item.rotation.y = rotation
  //   this.scale.set(
  //     scale,
  //     scale,
  //     scale,
  //   );
  // }

  update( ) {
    super.update();
  }
}
