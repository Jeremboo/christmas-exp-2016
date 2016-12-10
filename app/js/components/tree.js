import { Vector3 } from 'three'

import Item from './_item';

export default class ChristmasTree extends Item {
  constructor(position, scale, rotation) {
    super('tree', position, scale, rotation);
  }

  update( ) {
    super.update();
  }
}
