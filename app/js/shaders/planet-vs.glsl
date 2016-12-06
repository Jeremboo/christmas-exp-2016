uniform sampler2D uHeightMap;

float ampl; // TODO add to uniforms and dat.gui
varying vec3 vNormal;

void main() {
  vNormal = normal;
  ampl = 15.0;

  vec4 heightData = texture2D( uHeightMap, uv );
  vec3 newPosition = position + vNormal * heightData.r * ampl;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
