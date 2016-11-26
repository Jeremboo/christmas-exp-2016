import { Matrix4 } from 'three';

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

export const toRadians = angle  => angle * (Math.PI / 180);
