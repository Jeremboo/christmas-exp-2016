import { PerspectiveCamera, WebGLRenderer } from 'three'
import MainScene from '../scenes/mainScene'

export default class Engine {
  constructor( container ) {
    this.camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.set( 0, 0, 300 )
    this.camera.lookAt( 0, 0, 0 )

    this.renderer = new WebGLRenderer( { antialias: true } )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( this.innerWidth, this.innerHeight )
    this.renderer.setClearColor( 0x292929 )
    container.appendChild( this.renderer.domElement )

    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.resize()
    this.bind()
    this.init()
  }

  init() {
    this.scene = new MainScene()
    this.loop()
  }

  bind() {
    window.addEventListener( 'resize', this.resize.bind( this ), false )
  }

  loop() {
    this.raf = window.requestAnimationFrame( this.loop.bind( this ) )

    const now = Date.now()
    const delta = now - this.then

    if( delta > this.fpsInterval ) {
      this.scene.update()
      this.renderer.render( this.scene, this.camera )
      this.then = now
    }
  }

  resize() {
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight

    this.camera.aspect = this.innerWidth / this.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( this.innerWidth, this.innerHeight )
  }
}
