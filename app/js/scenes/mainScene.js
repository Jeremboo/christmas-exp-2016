import { Scene, SpotLight, SpotLightHelper } from 'three'
import Sphere from '../components/sphere'

export default class MainScene extends Scene {
  constructor() {
    super()

    this.sphere = new Sphere()
    this.add( this.sphere )

    this.spotLight = new SpotLight( 0xFF0000, 1.0 )
    this.spotLight.position.set( 0, 80, 150 )
    this.spotLight.lookAt( 0, 0, 0 )
    this.spotLight.distance = 80
    this.spotLight.angle = 10 * Math.PI / 180
    this.add( this.spotLight )

    this.spotLightHelper = new SpotLightHelper( this.spotLight )
    this.add( this.spotLightHelper )

    this.counter = 0
  }

  update() {
    this.sphere.update( this.spotLight.position )

    this.spotLight.position.x = Math.sin( this.counter ) * 20
    this.spotLightHelper.update()
    this.counter += 0.01
  }
}
