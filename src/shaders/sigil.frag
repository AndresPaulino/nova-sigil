varying float vDistortion;
varying vec3 vNormal;

// ─── Cosine Color Palette (Inigo Quilez) ───

vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  // Palette: gold highlights → navy shadows
  vec3 a = vec3(0.95, 0.79, 0.31);
  vec3 b = vec3(0.3);
  vec3 c = vec3(0.5, 0.5, 0.9);
  vec3 d = vec3(0.05, 0.08, 0.13);

  float t = vDistortion * 2.0 + 0.5;
  vec3 color = cosPalette(t, a, b, c, d);

  // Fresnel rim to accentuate edges
  float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
  color += fresnel * vec3(0.95, 0.79, 0.31) * 0.4;

  // Boost intensity so values exceed 1.0 for HDR bloom
  color *= 1.5;

  gl_FragColor = vec4(color, 1.0);
}
