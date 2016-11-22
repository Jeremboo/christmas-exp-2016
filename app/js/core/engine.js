import { PerspectiveCamera, WebGLRenderer, Vector3, Raycaster, Euler } from 'three'
import MainScene from '../scenes/mainScene'

export default class Engine {
  constructor( container ) {
    this.camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 100 )
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

    this.scene = new MainScene()

    // DRAGGING SPHERE
    this.sphereSelected = false;
    this.mouse = new Vector3();
    this.savedMousePosition = new Vector3();
    this.savedSphereRotation = new Vector3();
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
    this.mouse.set(
      (( e.clientX / window.innerWidth ) * 2) - 1,
      -(( e.clientY / window.innerHeight ) * 2) + 1,
      0,
    );
    this.raycaster.setFromCamera( this.mouse, this.camera );

    if ( this.sphereSelected ) {
      const delta = this.mouse.clone().sub(this.savedMousePosition);

      // TODO use matrix
      // TODO reverse position of delta when the spherePosition is negative
      this.scene.sphere.targetedRotation.set(
        this.savedSphereRotation.x - delta.y,
        this.savedSphereRotation.y + delta.x,
        this.savedSphereRotation.z,
      );
    }
  }

  onMouseDown(e) {
    this.raycaster.setFromCamera( this.mouse, this.camera );
    const intersects = this.raycaster.intersectObject( this.scene.sphere, true );
    if ( intersects.length > 0 ) {
      this.savedMousePosition.set(
        (( e.clientX / window.innerWidth ) * 2) - 1,
        -(( e.clientY / window.innerHeight ) * 2) + 1,
        0,
      );
      this.savedSphereRotation.copy(this.scene.sphere.rotation.toVector3());
      this.sphereSelected = true;
      document.body.style.cursor = 'move';
    }
  }

  onMouseUp() {
    if ( this.sphereSelected ) {
      this.sphereSelected = false;
      document.body.style.cursor = 'auto';
    }
  }
}
