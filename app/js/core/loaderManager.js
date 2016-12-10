import { JSONLoader, ObjectLoader, Object3D, Mesh, MeshFaceMaterial } from 'three';

import props from './props';

// PRIVATE
const onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};

const onError = (xhr) => {
  console.error('LoadingERROR : ', xhr);
};

const onLoaded = (item, loaded, total) => {
  console.log('Loaded : ', item, loaded, total);
};

const saveObjectToProps = (objectName, geometry, materials) => {
  props.objects.set(objectName, { geometry, materials });
};

// PUBLIC
export const loadJSON = (fileName, callback) => {
  const loader = new JSONLoader();
  loader.load(fileName, ( geometry, materials ) => {
    callback(geometry, materials );
  });
};

export const loadObj = (fileName, callback) => {
  const loader = new ObjectLoader();
  loader.load(fileName, (obj) => {
    callback(obj);
  }, onProgress, onError);
}


export const loadImage = (url) => {
  const img = new Image();
  img.src = url;
  return img;
};

export const loadAssetsFromProps = ({ onProgress = f => f, onComplete = f => f } = {}) => {
  let nbrAssetsLoaded = 0;
  const save = (name, object) => {
    props.objects.set(name, object);
    nbrAssetsLoaded++;
    if (nbrAssetsLoaded === props.assets.length) {
      onComplete();
    } else {
      onProgress(nbrAssetsLoaded / props.assets.length);
    }
  };

  for (let i = 0; i < props.assets.length; i++) {
    let object = null;
    const { name, children } = props.assets[i];

    if (children.length > 0) {
      loadObj(`assets/${name}.json`, ( loadedObjs ) => {
        object = new Object3D();
        object.name = 'item';
        for (let j = 0; j < children.length; j++) {
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
};
