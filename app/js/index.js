import domready from 'domready'
import dat from 'dat-gui';

import Engine from './core/engine'
import props from './core/props';

domready(() => {
  console.log('[DOM] - DOM is ready')

  // INIT
  const container = document.getElementById('experiment');
  const experiment = new Engine(container);

  // GUI
  const gui = new dat.GUI();

  // Rotation
  const rotationFolder = gui.addFolder('Rotation');
  rotationFolder.add(props.rotation, 'force', 10, 1000);
  rotationFolder.add(props.rotation, 'vel', 0.01, 0.2);
  rotationFolder.close();

  // Camera
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(props.camera.rotation, 'x', -Math.PI, Math.PI).name('rotationX');
  cameraFolder.add(props.camera.rotation, 'y', -Math.PI, Math.PI).name('rotationY');
  cameraFolder.add(props.camera.rotation, 'z', -Math.PI, Math.PI).name('rotationZ');

  cameraFolder.add(props.camera.position, 'x', 0, 1000).step(1).name('positionX');
  cameraFolder.add(props.camera.position, 'y', 0, 1000).step(1).name('positionY').listen();
  cameraFolder.add(props.camera.position, 'z', 0, 1000).step(1).name('positionZ').listen();
  cameraFolder.open();

  // Shader
  const shaderFolder = gui.addFolder('Shader');
  shaderFolder.add(props.shader, 'ceil', 0.0, 1.0).step(0.01).listen();
  shaderFolder.add(props.shader, 'amplitude', 0.1, 20.0).step(0.1);
  shaderFolder.add(props.shader, 'postProcess');
  shaderFolder.open();

  // Planete
  const planetFolder = gui.addFolder('Planet');
  planetFolder.add(props.rotation, 'autoRotate', true).listen();
  const endView = planetFolder.add(props.planet, 'endView', false);
  planetFolder.add(props.planet, 'vanishingDist', 0.1, 7).step(0.01);
  planetFolder.open();

  endView.onChange((value) => {
    if (value) {
      experiment.endGamePositionning()
    } else {
      experiment.inGamePositionning()
    }
  })

  // gui.close();
});
