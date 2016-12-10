import { Object3D, Vector3, Ray } from 'three'

import props from '../core/props';
import { getRandomFloat, toRadians, getRandomNormalizedVector3 } from '../core/utils';


export default class Item extends Object3D {
  constructor(itemName, pos = getRandomNormalizedVector3(), scale = 1.0, rotationY = 0 ) {
    super();

    this.position.copy(pos);
    this.position.normalize();
    this.position.multiplyScalar(props.planet.size);

    // Make object perpendicular
    this.up.negate();
    // Get vector to the center of the sphere
    const ray = new Ray(this.position);
    ray.lookAt(new Vector3());
    // calculate normal
    const axis = this.up.clone().cross(ray.direction).normalize();
    const angle = Math.acos(ray.direction.clone().dot(this.up));
    this.quaternion.setFromAxisAngle(axis, angle);

    // Add item object on the Item
    if (itemName || itemName.length > 0) {
      this.item = props.objects.get(itemName).clone();
      this.add(this.item);

      this.item.scale.multiplyScalar(scale);
      this.item.rotation.set(
        toRadians(getRandomFloat(0, 5)),
        toRadians(rotationY),
        toRadians(getRandomFloat(0, 5))
      );
    }
  }

  update() {
    const vector = new Vector3();
    vector.setFromMatrixPosition( this.matrixWorld );
    const ceil = props.planet.size * props.shader.ceil;
    // const ampl = 40;
    // const pos = vector.y / ceil;
    // const scale = Math.min(Math.max(pos * ampl - (ampl - 1), 0.0001), 1);
    const scale = Math.min(1, Math.max((vector.y - ceil) / props.planet.vanishingDist, 0.0001));
    this.scale.set(scale, scale, scale);
  }
}
