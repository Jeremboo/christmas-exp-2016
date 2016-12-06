import { Sprite, SpriteMaterial } from 'three'

export default class Star extends Sprite {
  constructor( texture ) {
    const spriteMaterial = new SpriteMaterial( { map: texture, depthTest: false } )
    super( spriteMaterial )
  }

  update( counter ) {
    this.scale.x = this.scale.y = Math.sin( counter ) + 1
  }
}
