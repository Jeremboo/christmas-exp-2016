import { JSONLoader, ObjectLoader, Object3D, Mesh, MeshFaceMaterial } from 'three';

import props from './props';

// PRIVATE
const onProgress = (xhr) => {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    // console.log(Math.round(percentComplete, 2) + '% downloaded');
    return percentComplete;
  }
};

const onError = (xhr) => {
  // console.error('LoadingERROR : ', xhr);
};

const onLoaded = (item, loaded, total) => {
  // console.log('Loaded : ', item, loaded, total);
};

const saveObjectToProps = (objectName, geometry, materials) => {
  props.objects.set(objectName, { geometry, materials });
};

// PUBLIC
export const loadJSON = (fileName, callback, progress) => {
  const loader = new JSONLoader();
  loader.load(fileName, ( geometry, materials ) => {
    callback(geometry, materials );
  }, progress, onError);
};

export const loadObj = (fileName, callback, progress) => {
  const loader = new ObjectLoader();
  loader.load(fileName, (obj) => {
    callback(obj);
  }, progress, onError);
}


export const loadImage = (url) => {
  const img = new Image();
  img.src = url;
  return img;
};

export const loadAssetsFromProps = ({ onProgress = f => f, onComplete = f => f } = {}) => {
  let nbrAssetsLoaded = 0;
  let progress = 0;
  let p = 100 / props.assets.length;
  const save = (name, object) => {
    props.objects.set(name, object);
    nbrAssetsLoaded++;
    if (nbrAssetsLoaded === props.assets.length) {
      onComplete();
    }
  };
  const updateProgress = (xhr) => {
    if (xhr.lengthComputable) {
      const percentComplete = xhr.loaded / xhr.total;
      progress = ((nbrAssetsLoaded * p) + (p * percentComplete)) / 100;
      onProgress(progress);
    }
  };

  for (let i = 0; i < props.assets.length; i++) {
    let object = null;
    const { name, children } = props.assets[i];

    if (children.length > 0) {
      loadObj(`assets/objects/${name}.json`, ( loadedObjs ) => {
        object = new Object3D();
        object.name = 'item';
        for (let j = 0; j < children.length; j++) {
          object.add(loadedObjs.getObjectByName(children[j]))
        }
        save(name, object);
      }, updateProgress);
    } else {
      loadJSON(`assets/${name}.json`, (geometry, material) => {
        object = new Mesh(geometry, new MeshFaceMaterial(material));
        save(name, object);
      }, updateProgress);
    }
  }
};
