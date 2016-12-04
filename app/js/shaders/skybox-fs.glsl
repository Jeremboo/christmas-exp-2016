varying vec2 vUv;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  float cUv = 0.0;

  if ( vUv.y < 0.5 ) {
    cUv = smoothstep( 0.0, 1.0, vUv.y * 2.0 );
  } else {
    cUv = smoothstep( 0.0, 1.0, 2.0 - vUv.y * 2.0 );
  }

  gl_FragColor = vec4( mix( uColor1, uColor2, cUv ), 1.0 );
}
