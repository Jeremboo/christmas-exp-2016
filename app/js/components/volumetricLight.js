import { Mesh, CylinderGeometry, MeshBasicMaterial } from 'three'

export default class VolumetricLight extends Mesh {
  constructor() {
    const cylinderGeometry = new CylinderGeometry( 10, 85, 120, 20 )
    const cylinderMaterial = new MeshBasicMaterial( { color: 0xFFFFFF, opacity: 0.05, transparent: true } )

    super( cylinderGeometry, cylinderMaterial )
    this.scale.x = -1

    this.counter = 0
  }

  update() {
    this.position.y = 220 + Math.sin( this.counter ) * 2
    this.counter += 0.02
  }
}
