import { Object3D, Vector3, Ray } from 'three'

import props from '../core/props';
import { getRandomFloat, toRadians } from '../core/utils';


export default class Item extends Object3D {
  constructor(itemName) {
    super();

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

    // Add and custom Item
    this.item = props.objects.get(itemName).clone();
    this.add(this.item);
    this.customize();
  }

  customize() {
    this.item.scale.multiplyScalar(getRandomFloat(1.5, 2.5));
    this.item.rotation.set(
      toRadians(getRandomFloat(0, 5)),
      toRadians(getRandomFloat(0, 360)),
      toRadians(getRandomFloat(0, 5))
    );
  }

  update() {}
}
