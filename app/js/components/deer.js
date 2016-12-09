import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Deer extends Item {
  constructor() {
    super('deer');

    super.naturalCustomize();
  }

  update() {
    super.update();
  }
}
