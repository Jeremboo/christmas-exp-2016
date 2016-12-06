import { PerspectiveCamera, WebGLRenderer, Raycaster } from 'three'
import MainScene from '../scenes/mainScene'

import { getNormalizedPosFromScreen } from './utils';
import props from './props';

export default class Engine {
  constructor( container ) {
    this.camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.set( 0, 0, 0 )
    this.camera.lookAt( 0, 0, 0 )

    this.renderer = new WebGLRenderer( { antialias: true } )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( this.innerWidth, this.innerHeight )
    this.renderer.setClearColor( 0x292929 )
    container.appendChild( this.renderer.domElement )

    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.init()
  }

  init() {
    this.scene = new MainScene()

    // DRAGGING SPHERE
    this.planetSelected = false;
    this.raycaster = new Raycaster();

    // BIND
    this.loop = this.loop.bind(this);
    this.resize = this.resize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    // START
    this.resize()
    this.loop()

    window.addEventListener( 'resize', this.resize, false )
    window.addEventListener( 'mousemove', this.onMouseMove, false );
    window.addEventListener( 'mousedown', this.onMouseDown, false );
    window.addEventListener( 'mouseup', this.onMouseUp, false );
  }

  loop() {
    this.raf = window.requestAnimationFrame( this.loop )

    const now = Date.now()
    const delta = now - this.then

    if( delta > this.fpsInterval ) {
      this.scene.update()
      this.camera.rotation.setFromVector3( props.camera.rotation )
      this.camera.position.copy( props.camera.position )
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

  onMouseMove(e) {
    if ( this.planetSelected ) {
      this.scene.planet.updateDragging(getNormalizedPosFromScreen(e.clientX, e.clientY));
    }
  }

  onMouseDown(e) {
    const mouseNormToScreen = getNormalizedPosFromScreen(e.clientX, e.clientY);
    this.raycaster.setFromCamera(mouseNormToScreen, this.camera );
    const intersects = this.raycaster.intersectObject( this.scene.planet, true );
    if ( intersects.length > 0 ) {
      this.scene.planet.startDragging(mouseNormToScreen);
      this.planetSelected = true;
      document.body.style.cursor = 'move';
    }
  }

  onMouseUp() {
    if ( this.planetSelected ) {
      this.planetSelected = false;
      document.body.style.cursor = 'auto';
    }
  }
}
