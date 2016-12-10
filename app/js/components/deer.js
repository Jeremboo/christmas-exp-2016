import { Vector3 } from 'three'

import Item from './_item';

export default class Deer extends Item {
  constructor(position, scale, rotation) {
    super('deer', position, scale, rotation);
  }

  update() {
    super.update();
  }
}
