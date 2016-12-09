import { CubeGeometry, MeshBasicMaterial, Mesh, Vector3 } from 'three'
import HUD from '../core/hud'

import Item from './_item';

export default class Candy extends Item {
  constructor( x, y, z, category ) {
    super('', new Vector3(x, y, z));

    // Collider
    const cubeGeometry = new CubeGeometry( 5, 5, 5 )
    const cubeMaterial = new MeshBasicMaterial( { color: 0xFF0000 } )
    this.collider = new Mesh( cubeGeometry, cubeMaterial )
    this.add( this.collider )

    // For raycaster
    this.collider.name = 'candy'
    this.active = true
    this.category = category
  }

  update( counter ) {
    super.update();
    // Animate the mesh instead of the collider
    this.collider.position.y = Math.sin( counter ) * 1 + 10;
    this.collider.rotation.y += 0.02
  }

  isClicked() {
    // Update the mesh instead of the collider
    if( this.active ) {
      this.active = false

      // animate
      this.visible = false

      this.collider.material.color.setHex( 0x00FF00 )
      HUD.foundCandy( this.category )
    }
  }
}
