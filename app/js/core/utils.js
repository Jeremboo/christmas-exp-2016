import { Matrix4, Vector3, Euler } from 'three';

export const toRadians = angle => angle * (Math.PI / 180);
export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;
export const getRandomEuler = () => new Euler(
  getRandomFloat(0, 6.2831),
  getRandomFloat(0, 6.2831),
  getRandomFloat(0, 6.2831),
);


export const getRotationMatrix = vectRotation => {
  const m = new Matrix4();
  const m1 = new Matrix4();
  const m2 = new Matrix4();
  const m3 = new Matrix4();

  m1.makeRotationX(-vectRotation.x);
  m2.makeRotationY(-vectRotation.y);
  m3.makeRotationY(-vectRotation.z);

  m.multiplyMatrices(m1, m2);
  m.multiply(m3);

  return m;
};

export const getRandomNormalizedVector3 = () => new Vector3(
  getRandomFloat(-1, 1),
  getRandomFloat(-1, 1),
  getRandomFloat(-1, 1),
);

export const getNormalizedPosFromScreen = (x, y) => new Vector3(
  (( x / window.innerWidth ) * 2) - 1,
  -(( y / window.innerHeight ) * 2) + 1,
  0,
);

export const worldToLocalDirection = ( object, worldDirectionVector, localDirectionVector ) => {
  object.updateMatrixWorld()
  localDirectionVector.copy( worldDirectionVector ).applyQuaternion( object.getWorldQuaternion().inverse() )
  return localDirectionVector
}

export const easing = (target, value, { vel = 0.03, update = f => f, callback = f => f } = {}) => {
  const f = (target - value) * vel;
  update(f);
  if (Math.abs(f) < 0.001) {
    callback();
  }
}
