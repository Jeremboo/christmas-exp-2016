uniform vec3 uColor;
uniform vec3 uLight;
uniform float uCeil;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float opacity = 0.0;

  vec3 light = normalize( uLight );

  // get the dot product of
  // the light and the vertex normal
  float dotProduct = max( 0.0, dot( vNormal, light ) );

  // if dotProduct > 0.9
  // show the mesh
  // TODO trouver un moyen de remplacer les if (GOURMAND)
  if( dotProduct > uCeil ) {
    opacity = 1.0;
  } else if( dotProduct > 0.94 ) {
    opacity = ( dotProduct - 0.94 ) / ( uCeil - 0.94 );
  }

  gl_FragColor = vec4( uColor.xyz, opacity );
}
