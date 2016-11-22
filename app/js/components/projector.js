import { Object3D, SpotLight, SpotLightHelper } from 'three'


export default class Sphere extends Object3D {
  constructor() {
    super();

    this.counter = 0;

    this.spotLight = new SpotLight( 0xFFFFFF, 1.0 )
    this.spotLight.position.set( 0, 80, 150 )
    this.spotLight.lookAt( 0, 0, 0 )
    this.spotLight.distance = 100
    this.spotLight.angle = 10 * Math.PI / 180;
    this.add( this.spotLight );

    this.spotLightHelper = new SpotLightHelper( this.spotLight )
    this.add( this.spotLightHelper )
  }

  update(  ) {
    this.position.x = Math.sin( this.counter ) * 20
    this.spotLightHelper.update()
    this.counter += 0.01
  }
}
