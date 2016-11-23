uniform sampler2D uHeightMap;

varying float ampl; // TODO add to uniforms and dat.gui
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  ampl = 30;

  vec4 heightData = texture2D( uHeightMap, uv );
  vec3 newPosition = position + vNormal * heightData.r * ampl;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
