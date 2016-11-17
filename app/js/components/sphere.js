import { Mesh, SphereGeometry, MeshBasicMaterial } from 'three'

export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( 20, 30, 30 )
    const material = new MeshBasicMaterial( { color: 0xecf0f1, wireframe: true } )
    super( geometry, material )
  }

  update() {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}
