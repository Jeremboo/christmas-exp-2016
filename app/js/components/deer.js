import { Vector3 } from 'three'

import Item from './_item';

export default class Deer extends Item {
  constructor() {
    super('deer');

    super.naturalCustomize();
  }

  update() {
    super.update();
  }
}
