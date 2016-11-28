import { Mesh, SphereGeometry, ShaderMaterial, Vector3, Quaternion, Euler, JSONLoader, SkeletonHelper, SkinnedMesh, MeshBasicMaterial, Object3D } from 'three'
import ThreejsTextureTool from 'threejs-texture-tool';
import { toRadians, getRandomFloat, getRandomEuler } from '../core/utils';

import props from '../core/props';

const glslify = require( 'glslify' );

const SIZE = 100;
const vertexShader = glslify( '../shaders/sphere-vs.glsl' )
const fragmentShader = glslify( '../shaders/sphere-fs.glsl' )

export default class Sphere extends Mesh {
  constructor() {
    const geometry = new SphereGeometry( SIZE, 30, 30 )
    const textureTool = new ThreejsTextureTool();

    const biomeTextureTool = textureTool.createImageTexture('assets/images/biome.jpg', 'Biome');
    const heightMapTextureTool = textureTool.createImageTexture('assets/images/heightMap.jpg', 'HeightMap');

    const material = new ShaderMaterial( {
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: {
          type: 'v3',
          value: new Vector3( 1.0, 1.0, 1.0 )
        },
        uLight: {
          type: 'v3',
          value: props.lightPosition,
        },
        uTexture: biomeTextureTool.uniform,
        uHeightMap: heightMapTextureTool.uniform,
      },
      transparent: true
    } )

    super( geometry, material )

    this.savedQuaternions = new Quaternion();
    this.baseMousePos = new Vector3();
    this.currentMousePos = new Vector3();
    this.targetedMousePos = new Vector3();


    // TODO laod this into mainScene  or index
    this.christmasTrees = [];
    // instantiate a loader
    // https://www.youtube.com/watch?v=eEqB-eKcv7k&index=15&list=PLOGomoq5sDLutXOHLlESKG2j9CCnCwVqg
    // https://www.youtube.com/watch?v=eEqB-eKcv7k
    const loader = new JSONLoader();
    // load a resource
    loader.load('assets/skeleton.json', ( geometry, materials ) => {
        console.log(geometry, materials);

        for (let i = 0; i < 200; i++) {
          // TODO place with texture
          this.createThree(geometry, material);
        }
      }
    );
  }

  createThree(geometry, material) {
    // TODO use materials
    const container = new Object3D();

    container.rotation.copy(getRandomEuler());

    const christmasTree = new SkinnedMesh( geometry, new MeshBasicMaterial({ color: 'red', skinning: true }) );
    christmasTree.castShadow = true;
    christmasTree.receiveShadow = true;
    christmasTree.position.z = SIZE;
    christmasTree.rotation.set( toRadians(90), 0, 0);
    christmasTree.scale.multiplyScalar(getRandomFloat(1, 2));
    this.christmasTrees.push(christmasTree);
    container.add(christmasTree);

    this.add(container);
  }

  update( ) {
    // update light position
    this.material.uniforms.uLight.value = props.lightPosition;

    // updateRotation
    const dist = this.targetedMousePos.clone().sub(this.currentMousePos);
    const vel = dist.clone().multiplyScalar(props.rotationVel);
    this.currentMousePos.add(vel);

    const delta = this.currentMousePos.clone().sub(this.baseMousePos)
    const deltaRotationQuaternion = new Quaternion()
    .setFromEuler(new Euler(
       toRadians(-delta.y * props.rotationForce),
       toRadians(delta.x * props.rotationForce),
       0,
       'XYZ'
    ));
    this.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.savedQuaternions);

    // update skeleton
    let i;
    let j;
    const christmasTreesLength = this.christmasTrees.length;
    for (i = 0; i < christmasTreesLength; i++) {
      const bonesLenght = this.christmasTrees[i].skeleton.bones.length;
      for (j = 0; j < bonesLenght; j++) {
        this.christmasTrees[i].skeleton.bones[j].rotation.copy(getRandomEuler());
      }
    }
  }

  startDragging(mousePos) {
    this.baseMousePos.copy(mousePos);
    this.currentMousePos.copy(mousePos);
    this.targetedMousePos.copy(mousePos);
    this.savedQuaternions.copy(this.quaternion);
  }

  updateDragging(targetedMousePos) {
    this.targetedMousePos.copy(targetedMousePos);
  }
}
