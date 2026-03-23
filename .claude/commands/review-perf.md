Review the current Three.js scene for performance issues:
1. Check that all R3F components are dynamically imported with ssr: false
2. Verify PerformanceMonitor is wrapping the scene
3. Check for geometry/material disposal on unmount
4. Verify no Three.js imports leak into Server Components
5. Check texture sizes (should be ≤2048x2048, KTX2 preferred)
6. Verify InstancedMesh is used for repeated objects (particles)
7. Run `npm run build` and check bundle analyzer output
Report findings and fix any issues found.