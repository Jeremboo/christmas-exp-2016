uniform vec3 uColor;
uniform vec3 uLight;
uniform sampler2D uTexture;
varying vec2 vUv;
varying vec3 vNormal;

void main() {
  float opacity = 0.0;

  vec3 light = normalize( uLight );

  // calculate the dot product of
  // the light to the vertex normal
  // TODO prender la rotation en compte
  float dotProduct = max( 0.0, dot( vNormal, light ) );

  // if dotProduct > 0.9
  // show the mesh
  // TODO trouver un moyen de remplacer les if (GOURMAND)
  if( dotProduct > 0.9 ) {
    opacity = 1.0;
  } else if(dotProduct > 0.85 ){
    opacity = 0.1;
  } else {
    opacity = 0.0;
  }

  vec4 texture = texture2D( uTexture, vUv );
  gl_FragColor = vec4( texture.xyz, opacity );
  // gl_FragColor = vec4( texture.xyz, dotProduct );
  // gl_FragColor = vec4( dotProduct * uColor.x, dotProduct * uColor.y, dotProduct * uColor.z, opacity );
}
