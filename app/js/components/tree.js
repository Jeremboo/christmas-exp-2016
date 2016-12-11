import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';

export default class ChristmasTree extends Item {
  constructor(position, scale = getRandomFloat(2, 3), rotation) {
    super('tree', position, scale, rotation);
  }

  update( ) {
    super.update();
  }
}
