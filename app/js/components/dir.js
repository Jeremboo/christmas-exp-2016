import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Dir extends Item {
  constructor() {
    super('dir');

    super.naturalCustomize();
  }

  update() {
    super.update();
  }
}
