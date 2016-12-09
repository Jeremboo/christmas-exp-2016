import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Mountain extends Item {
  constructor() {
    super('mountain');

    this.item.scale.multiplyScalar(getRandomFloat(2.5, 3));
    super.naturalCustomize();
  }

  update( ) {
    super.update();
  }
}
