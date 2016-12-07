// import { Sprite, SpriteMaterial } from 'three'
//
// export default class Star extends Sprite {
//   constructor( texture ) {
//     const spriteMaterial = new SpriteMaterial( { map: texture, depthTest: false } )
//     super( spriteMaterial )
//   }
//
//   update( counter ) {
//     this.scale.x = this.scale.y = Math.sin( counter ) + 1
//   }
// }

import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three'

export default class Star extends Mesh {
  constructor() {
    const starGeometry = new SphereGeometry( 0.5, 2, 2 )
    const starMaterial = new MeshBasicMaterial( { color: 0xECF0F1 } )
    super( starGeometry, starMaterial )

    this.position.x = Math.random() * 2 - 1
    this.position.y = Math.random() * 2 - 1
    this.position.z = Math.random() * 2 - 1
    this.position.normalize()
    this.position.multiplyScalar( Math.random() * 300 + 300 )
  }

  update( counter ) {
    this.scale.x = this.scale.y = this.scale.z = Math.sin( counter ) + 1
  }
}
