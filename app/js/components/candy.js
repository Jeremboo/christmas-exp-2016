import { Vector3, CubeGeometry, MeshBasicMaterial, Mesh } from 'three'
import { TimelineLite } from 'gsap';

import HUD from '../core/hud'
import { getRandomFloat } from '../core/utils'
import Item from './_item';


export default class Candy extends Item {
  constructor(category, position, scale) {
    super(category, position, scale);

    // Collider
    const cubeGeometry = new CubeGeometry( 5, 15, 5 )
    const cubeMaterial = new MeshBasicMaterial({
      color: 0xFF0000,
      transparent: true,
      opacity: 0.0
    });
    this.collider = new Mesh( cubeGeometry, cubeMaterial )
    this.add( this.collider )

    // For raycaster
    this.name = 'candy'
    this.active = true
    this.category = category

    this.item.rotation.y = getRandomFloat(0, 10);
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].name = 'candy'
      this.children[i].scale.set(2, 2, 2);
      this.children[i].position.y = getRandomFloat(8, 10);
    }
  }

  update( counter ) {
    super.update();

    for(let i = 0; i < this.children.length; i++) {
      this.children[i].position.y += Math.sin( counter ) * 0.1;
      this.item.rotation.y += 0.02
    }
  }

  isClicked() {
    if( this.active ) {
      this.active = false;

      const t = new TimelineLite({
        onComplete: () => {
          this.visible = false;
        },
      });
      t.to(this.item.rotation, 0.5, { y: this.item.rotation.y + 5 });
      t.to(this.item.position, 0.5, { y: 25 }, '-=0.5');
      t.to(this.item.scale, 0.5, { x: 0.01, y: 0.01, z: 0.01 }, '-=0.5');
      t.play();

      HUD.foundCandy( this.category );
    }
  }
}
