import { Object3D, CubeGeometry, MeshBasicMaterial, Mesh, Ray, Vector3 } from 'three'
import HUD from '../core/hud'

export default class Candy extends Object3D {
  constructor( x, y, z, category ) {
    super()

    // Collider
    const cubeGeometry = new CubeGeometry( 5, 5, 5 )
    const cubeMaterial = new MeshBasicMaterial( { color: 0xFF0000 } )
    this.collider = new Mesh( cubeGeometry, cubeMaterial )
    this.add( this.collider )

    this.position.x = x
    this.position.y = y
    this.position.z = z
    this.position.normalize()
    this.position.multiplyScalar( 210 )

    // Make object perpendicular
    this.up.negate()
    const ray = new Ray( this.position )
    ray.lookAt( new Vector3() )
    const axis = this.up.clone().cross( ray.direction ).normalize()
    const angle = Math.acos( ray.direction.clone().dot( this.up ) )
    this.quaternion.setFromAxisAngle( axis, angle )

    // For raycaster
    this.collider.name = 'candy'
    this.active = true
    this.category = category
  }

  update( counter ) {
    // Animate the mesh instead of the collider
    this.collider.position.y = Math.sin( counter ) * 1
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
