import { Matrix4, Vector3, Euler } from 'three';

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

export const toRadians = angle => angle * (Math.PI / 180);

export const getNormalizedPosFromScreen = (x, y) => new Vector3(
  (( x / window.innerWidth ) * 2) - 1,
  -(( y / window.innerHeight ) * 2) + 1,
  0,
);

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;
export const getRandomEuler = () => new Euler(
  getRandomFloat(0, 6.2831),
  getRandomFloat(0, 6.2831),
  getRandomFloat(0, 6.2831),
);
