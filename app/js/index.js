import domready from 'domready'
import dat from 'dat-gui';
import Engine from './core/engine'
import props from './core/props';

domready( () => {
  console.log( '[DOM] - DOM is ready' )

  const container = document.getElementById( 'experiment' )
  const experiment = new Engine( container )

  const gui = new dat.GUI();
  const rotationFolder = gui.addFolder('Rotation');
  rotationFolder.add(props.rotation, 'force', 10, 1000);
  rotationFolder.add(props.rotation, 'vel', 0.01, 0.2);
  rotationFolder.open();

  // gui.close();
} )
