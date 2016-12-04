uniform vec3 uColor;
uniform vec3 uLight;
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
  if( dotProduct > 0.9 ) {
    opacity = 1.0;
  } else if( dotProduct > 0.85 ) {
    opacity = ( dotProduct - 0.85 ) / ( 0.9 - 0.85 );
  }

  vec4 texture = texture2D( uTexture, vUv );
  gl_FragColor = vec4( texture.xyz, opacity );
}
