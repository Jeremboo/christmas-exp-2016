import { Scene } from 'THREE'
import Sphere from '../components/sphere'

export default class MainScene extends Scene {
  constructor() {
    super()

    this.sphere = new Sphere()
    this.sphere.position.z = -100
    this.add( this.sphere )
  }

  update() {
    this.sphere.update()
  }
}
