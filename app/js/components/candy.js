import { Object3D, CubeGeometry, MeshBasicMaterial, Mesh, Ray, Vector3 } from 'three'

export default class Candy extends Object3D {
  constructor() {
    super()

    // Collider
    const cubeGeometry = new CubeGeometry( 5, 5, 5 )
    const cubeMaterial = new MeshBasicMaterial( { color: 0xFF0000 } )
    this.collider = new Mesh( cubeGeometry, cubeMaterial )
    this.add( this.collider )

    this.position.x = Math.random() * 2 - 1
    this.position.y = Math.random() * 2 - 1
    this.position.z = Math.random() * 2 - 1
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
  }

  update( counter ) {
    // Animate the mesh instead of the collider
    this.collider.position.y = Math.sin( counter ) * 1
    this.collider.rotation.y += 0.02
  }

  isClicked() {
    // Update the mesh instead of the collider
    this.collider.material.color.setHex( 0x00FF00 )
  }
}
