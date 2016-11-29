import { JSONLoader, OBJLoader } from 'three';


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

export const loadJSONs = (fileNameArray, callback) => {
  // TODO load json
};

export const loadObj = (fileName, callback) => {
  const loader = new OBJLoader();
  loader.load(fileName, (obj) => {
    callback(obj);
  }, onProgress, onError);
}


export const loadImage = (url) => {
  const img = new Image();
  img.src = url;
  return img;
};
