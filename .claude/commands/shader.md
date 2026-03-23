Create a GLSL shader for the Nova Sigil project.
Effect: $ARGUMENTS
Requirements:
- Write as separate .vert and .frag files in src/shaders/
- Include uniforms for uTime, uScroll (0-1), uMouse (vec2), uResolution
- Use the gold-to-navy cosine palette: a=vec3(0.95,0.79,0.31) b=vec3(0.3) c=vec3(0.5,0.5,0.9) d=vec3(0.05,0.08,0.13)
- Export as raw strings using ?raw import suffix
- Create a React component that uses the shader via ShaderMaterial