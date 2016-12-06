varying vec2 vUv;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  // float cUv = smoothstep( 0.0, 1.0, vUv.x );

  gl_FragColor = vec4( mix( uColor1, uColor2, vUv.y ), 1.0 );
}
