import { PerspectiveCamera, WebGLRenderer, Raycaster } from 'three';

// POST PROCESS
import WAGNER from '@superguigui/wagner';
import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

import { TweenLite, TimelineLite, Power2, Power3 } from 'gsap';
import MainScene from '../scenes/mainScene';

import { getNormalizedPosFromScreen, toRadians } from './utils';
import props from './props';

import HUD from './hud';

export default class Engine {
  constructor(container) {
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 0, 0);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.innerWidth, this.innerHeight);
    this.renderer.setClearColor(0x02061D);
    container.appendChild(this.renderer.domElement);

    const fps = 120;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();

    const usePostProcess = true
    if( usePostProcess ) {
      this.initPostProcessing()
    }

    this.init();
  }

  init() {
    // DRAGGING SPHERE
    this.planetSelected = false;
    this.raycaster = new Raycaster();

    // BIND
    this.loop = this.loop.bind(this);
    this.resize = this.resize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.inGamePositionning = this.inGamePositionning.bind(this);
    this.endGamePositionning = this.endGamePositionning.bind(this);

    // START
    this.scene = new MainScene();

    this.resize();
    this.loop();

    TweenLite.to(props.camera.position, 8, { y: 430, ease: Power2.easeOut });

    HUD.load(() => {
      this.scene.planet.placeItems(() => {
        this.inGamePositionning();
        HUD.startGame(this.endGamePositionning);
      });
    });

    window.addEventListener('resize', this.resize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
    window.addEventListener('mousedown', this.onMouseDown, false);
    window.addEventListener('mouseup', this.onMouseUp, false);
  }

  initPostProcessing() {
    // INIT POST PROCESS
    this.composer = new WAGNER.Composer(this.renderer);
    this.vignette = new VignettePass({ reduction: 0.5 });
  }

  inGamePositionning() {
    props.rotation.autoRotate = false;
    const t = new TimelineLite();
    t.to(props.camera.position, 4, { y: 255, z: 150, ease: Power2.easeOut });
    t.to(props.camera.rotation, 2, { x: -0.3, ease: Power2.easeOut }, '-=4');

    t.to(props.shader, 2, { ceil: 0.95, ease: Power3.easeOut }, '-=2');
    t.play();
  }

  endGamePositionning() {
    props.rotation.autoRotate = true;
    const t = new TimelineLite();
    t.to(props.camera.rotation, 3, { x: toRadians(-90), ease: Power2.easeOut });
    t.to(props.camera.position, 4, { y: 910, z: 0, ease: Power2.easeOut }, '-=3');
    t.to(props.shader, 5, { ceil: 0, ease: Power3.easeOut }, '-=4');
    t.play();
  }

  loop() {
    this.raf = window.requestAnimationFrame(this.loop);

    const now = Date.now();
    const delta = now - this.then;

    if(delta > this.fpsInterval) {
      this.scene.update();
      this.camera.rotation.setFromVector3(props.camera.rotation);
      this.camera.position.copy(props.camera.position);

      // POST PROCESS RENDERING
      if(props.shader.postProcess) {
        this.renderer.autoClearColor = true;
        this.composer.reset();
        this.composer.render(this.scene, this.camera);
        this.composer.pass(this.vignette);
        this.composer.toScreen();
      } else {
        this.renderer.render(this.scene, this.camera);
      }

      this.then = now;
    }
  }

  resize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.composer) {
      this.composer.setSize(this.innerWidth, this.innerHeight);
    }

    this.camera.aspect = this.innerWidth / this.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.innerWidth, this.innerHeight);
  }

  onMouseMove(e) {
    if (this.planetSelected) {
      this.scene.planet.updateDragging(getNormalizedPosFromScreen(e.clientX, e.clientY));
    }
  }

  onMouseDown(e) {
    const mouseNormToScreen = getNormalizedPosFromScreen(e.clientX, e.clientY);
    this.raycaster.setFromCamera(mouseNormToScreen, this.camera);
    const intersects = this.raycaster.intersectObject(this.scene.planet, true);
    if(intersects.length > 0) {
      if(intersects[0].object.name === 'planet' || intersects[0].object.parent.name === 'item') {
        this.scene.planet.startDragging(mouseNormToScreen);
        this.planetSelected = true;
        document.body.style.cursor = 'move';
      } else if(intersects[0].object.name === 'candy') {
        intersects[0].object.parent.isClicked();
      }
    }
  }

  onMouseUp() {
    if (this.planetSelected) {
      this.planetSelected = false;
      document.body.style.cursor = 'auto';
    }
  }
}
