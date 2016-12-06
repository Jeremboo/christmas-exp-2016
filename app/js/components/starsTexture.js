import { Mesh, Texture, PlaneGeometry, MeshBasicMaterial } from 'three'

class Star {
  constructor( x, y ) {
    this.position = { x, y }
    this.originalRadius = Math.random() * 1 + 0.5
    this.radius = 0
  }

  update( counter ) {
    this.radius = this.originalRadius + Math.sin( counter ) * 0.5
  }
}

class Stars {
  constructor() {
    this.canvas = document.createElement( 'canvas' )
    this.canvas.width = 1024
    this.canvas.height = this.canvas.width / 2
    this.context = this.canvas.getContext( '2d' )

    const starsNumber = 200
    this.stars = []

    for( let i = 0; i < starsNumber; i++ ) {
      const star = new Star( Math.random() * this.canvas.width, Math.random() * this.canvas.height )
      this.stars.push( star )
    }

    this.counter = 0
  }

  update() {
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height )
    for( const star of this.stars ) {
      star.update( this.counter + this.stars.indexOf( star ) )

      this.context.beginPath()
      this.context.arc( star.position.x, star.position.y, star.radius, 0, Math.PI * 2 )
      this.context.fillStyle = '#ecf0f1'
      this.context.fill()
      this.context.closePath()
    }

    this.counter += 0.02
  }
}

export default class StarsTexture extends Mesh {
  constructor() {
    const stars = new Stars()
    const texture = new Texture( stars.canvas )
    const planeGeometry = new PlaneGeometry( 400, 200, 1 )
    const planeMaterial = new MeshBasicMaterial( { map: texture, transparent: true } )

    super( planeGeometry, planeMaterial )

    this.stars = stars
    this.texture = texture
  }

  update() {
    this.stars.update()
    this.texture.needsUpdate = true
  }
}
