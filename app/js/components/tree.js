import { Vector3 } from 'three'

import Item from './_item';

export default class ChristmasTree extends Item {
  constructor() {
    super('tree');

    this.oldWorldPosition = new Vector3();
    super.naturalCustomize();
  }

  update( ) {
    super.update();
  }
}
