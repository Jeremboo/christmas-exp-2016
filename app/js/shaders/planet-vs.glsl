#pragma glslify: pnoise = require( glsl-noise/periodic/3d )

varying vec3 vNormal;
uniform float amplitude;
float noise;

float turbulence( vec3 p ) {
  float w = 100.0;
  float t = -0.5;
  for (float f = 1.0 ; f <= 10.0 ; f++ ){
      float power = pow( 2.0, f );
      t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
  }
  return t;
}

void main() {
  vNormal = normal;

  noise = 5.0 * -0.10 * turbulence( 0.5 * normal );
  float b = amplitude * pnoise( 0.05 * position + vec3( 2.0 ), vec3( 100.0 ) );
  float displacement = - noise + b;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
