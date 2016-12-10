import { Vector3 } from 'three'

import Item from './_item';
import { getRandomFloat } from '../core/utils';


export default class Mountain extends Item {
  constructor(position, scale, rotation) {
    super('mountain', position, scale, rotation);
  }

  update( ) {
    super.update();
  }
}
