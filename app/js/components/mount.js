import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Mount extends Item {
  constructor() {
    super('mount');

    this.item.scale.multiplyScalar(getRandomFloat(2, 3));
  }

  update( ) {}
}
