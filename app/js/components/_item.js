import { Object3D, Vector3, Ray } from 'three'

import props from '../core/props';
import { getRandomFloat, toRadians, getRandomNormalizedVector3 } from '../core/utils';


export default class Item extends Object3D {
  constructor(itemName, pos = getRandomNormalizedVector3()) {
    super();

    this.position.copy(pos);
    this.position.normalize();
    this.position.multiplyScalar( 202 );

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
    }
  }

  naturalCustomize() {
    this.item.scale.multiplyScalar(getRandomFloat(0.5, 1.5));
    this.item.rotation.set(
      toRadians(getRandomFloat(0, 5)),
      toRadians(getRandomFloat(0, 360)),
      toRadians(getRandomFloat(0, 5))
    );
  }

  update() {
    const vector = new Vector3();
    vector.setFromMatrixPosition( this.matrixWorld );
    // console.log(a);
    // console.log(Math.min(a + 0.20, 1));
    // console.log( 1 - Math.max( 190 / 200, ( vector.y - 200 ) * 190 / 200 ) )
    // console.log( ( vector.y - ceil ) / ceil * 200 / ceil );
    const ceil = 194;
    const ampl = 40;
    const pos = vector.y / ceil;
    const scale = Math.min( Math.max( (pos * ampl) - (ampl - 1), 0.0001), 1);
    this.scale.set(scale, scale, scale);
  }
}
