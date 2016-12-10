import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Deer extends Item {
  constructor(position, scale, rotation) {
    super('deer', position, scale, rotation);
  }

  update() {
    super.update();
  }
}
