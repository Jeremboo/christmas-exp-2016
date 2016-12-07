import domready from 'domready'
import dat from 'dat-gui';
import { Object3D, Mesh, MeshBasicMaterial, MeshFaceMaterial } from 'three';

import Engine from './core/engine'
import props from './core/props';
import { loadObj, loadJSON } from './core/loaderManager';


domready( () => {
  console.log( '[DOM] - DOM is ready' )

  const gui = new dat.GUI();
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
  cameraFolder.add(props.camera.position, 'y', 0, 1000).step(1).name('positionY');
  cameraFolder.add(props.camera.position, 'z', 0, 1000).step(1).name('positionZ');
  cameraFolder.open();

  // Shader
  const shaderFolder = gui.addFolder('Shader');
  shaderFolder.add(props.shader, 'ceil', 0.0, 1.0).step( 0.01 );
  shaderFolder.open();

  // gui.close();


  function init() {
    // TODO create custom trees with another colors
    const container = document.getElementById( 'experiment' )
    const experiment = new Engine( container )
  }

  /**
   * LOADER
   */
  let i, j;
  let loader = 0;
  const loaderI = 100 / props.assets.length;

  function save(name, object) {
    props.objects.set(name, object);
    loader += loaderI;
    console.log(`... ${loader}%`);

    // TEST THE END
    if (loader === 100) init();
  }

  console.log('... Loading');
  for (i = 0; i < props.assets.length; i++) {
    let object = null;
    const { name, children } = props.assets[i];

    if (children.length > 0) {
      loadObj(`assets/${name}.json`, loadedObjs => {
        object = new Object3D();
        for (j = 0; j < children.length; j++) {
          object.add(loadedObjs.getObjectByName(children[j]))
        }
        save(name, object);
      });
    } else {
      loadJSON(`assets/${name}.json`, (geometry, material) => {
        object = new Mesh(geometry, new MeshFaceMaterial(material));
        save(name, object);
      });
    }
  }

} )
